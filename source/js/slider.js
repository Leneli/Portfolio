//Slider
let slider = document.getElementById("slider");

forElement(slider).then(function() {
	window.onload = function() {
		Slider.init();
	};

	let Slider = {
		init() {
			this.display = document.getElementById("display");
			this.header = document.getElementById("header");
			this.description = document.getElementById("description");
			this.siteLink = document.getElementById("siteLink");
			this.btnPrew = document.getElementById("btnPrew");
			this.btnNext = document.getElementById("btnNext");
			this.btnPrewImg = document.getElementById("btnPrewImg");
			this.btnNextImg = document.getElementById("btnNextImg");
			
			this.works = [];
			
			this.addData();

			//заполнить слайдер первоначальными данными
			Slider.clicking(0, (this.works.length - 1), 1);

			this.duration = 1000;

			this.display.addEventListener("click", function() {
				Slider.animate({
					duration: 3000,
					timing: function(timeFraction) { return timeFraction; },
					draw: function(progress) {
						console.log(progress);
						Slider.display.style.opacity = progress;
					}
				});
			});

			//Ajax
			/*this.data("/assets/json/slider.json")
				.then(function(dataArray) {
					for(let i = 0; i < dataArray.length; i++) {
						Slider.works.push(dataArray[i]);
						Slider.works[i].index = i;
					}
					//заполнить слайдер первоначальными данными
					Slider.clicking(0, (dataArray.length - 1), 1);
				})
				.catch(function(status) {
					console.error("Код ответа: ", status);
				});*/


			//Events
			this.btnPrew.addEventListener("click", function(event) {
				let indexes = [
						Slider.display.dataset.index, 
						Slider.btnPrewImg.dataset.index, 
						Slider.btnNextImg.dataset.index
					];

				Slider.toggleIndexes(indexes, "minus");
				Slider.addAnimate(indexes[0], indexes[1], indexes[2]);
			});

			this.btnNext.addEventListener("click", function() {
				let indexes = [
						Slider.display.dataset.index, 
						Slider.btnPrewImg.dataset.index, 
						Slider.btnNextImg.dataset.index
					];

				Slider.toggleIndexes(indexes, "plus");
				Slider.addAnimate(indexes[0], indexes[1], indexes[2]);
			});
		},

		addData() {
			let dataList = slider.querySelector(".slider__data");

			for(let i = 0; i < dataList.children.length; i++) {
				let li = {
					title: dataList.children[i].dataset.name,
					desc: dataList.children[i].dataset.tech,
					image: dataList.children[i].dataset.url,
					preview: dataList.children[i].dataset.url,
					link: dataList.children[i].dataset.link,
					index: i
				}
				Slider.works.push(li);
			}
		},
		
		/*data(url) {
			return new Promise(function(resolve, reject) {
				let xhr = new XMLHttpRequest();
				xhr.open("GET", url, true);
				xhr.responseType = "json";
				xhr.send();
				xhr.onreadystatechange = function() {
					if(xhr.readyState !== 4) return;
					if(xhr.status !== 200) {
						reject(xhr.status);
					} else {
						resolve(xhr.response);
					}
				};
			});
		},*/

		addTextBlock(index) {
			this.header.innerText = this.works[index].title;
			this.description.innerText = this.works[index].desc;
			this.siteLink.href = this.works[index].link;
		},

		addDisplay(index) {
			this.display.src = this.works[index].image;
			this.display.alt = this.works[index].title;
			this.display.dataset.index = index;
		},

		addNextImg(index) {
			this.btnNextImg.src = this.works[index].preview;
			this.btnNextImg.alt = this.works[index].title;
			this.btnNextImg.dataset.index = index;
		},

		addPrewImg(index) {
			this.btnPrewImg.src = this.works[index].preview;
			this.btnPrewImg.alt = this.works[index].title;
			this.btnPrewImg.dataset.index = index;
		},

		clicking(displayIndex, prewIndex, nextIndex) {
			//main content in the slider: big picture, title, description and link
			this.addDisplay(displayIndex);
			this.addTextBlock(displayIndex);
			//small image on the button "previous work"
			this.addPrewImg(prewIndex);
			//small image on the button "next work"
			this.addNextImg(nextIndex);
		},

		toggleIndexes(arr, type) {
			let max = this.works.length - 1;

			for(let i = 0; i < arr.length; i++) {
				switch(type) {
					case "plus" :
						if(arr[i] == max) arr[i] = 0;
						else arr[i]++;
						break;
					case "minus" :
						if(arr[i] == 0) arr[i] = max;
						else arr[i]--;
						break;
				}
			}
		},
		
		animate(options) {
			let start = performance.now();

			requestAnimationFrame(function animate(time) {
				// timeFraction от 0 до 1
				let timeFraction = (time - start) / options.duration;
				if (timeFraction > 1) timeFraction = 1;

				// текущее состояние анимации
				let progress = timeFraction;
				//функция, описывающая анимацию
				options.draw(progress);

				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}
			});
		},

		addAnimate(i, j, k) {
			//анимация до переключения слайда
			Slider.animate({
				duration: Slider.duration,
				draw: function (progress) {
					Slider.btnPrewImg.style.marginTop = progress * 600 + "px";
					Slider.btnNextImg.style.marginTop = progress * -600 + "px";
					Slider.display.style.opacity = 1 - progress;
				}
			});

			setTimeout(function () {
				Slider.clicking(i, j, k);

				Slider.btnPrewImg.style.marginTop = 0 + "px";
				Slider.btnPrewImg.style.height = 0 + "%";
				Slider.btnNextImg.style.marginTop = 0 + "px";
				Slider.btnNextImg.style.height = 0 + "%";

				//анимация после переключения слайда
				Slider.animate({
					duration: Slider.duration,
					draw: function (progress) {
						Slider.btnPrewImg.style.height = progress * 100 + "%";
						Slider.btnNextImg.style.height = progress * 100 + "%";
						Slider.display.style.opacity = progress;
					}
				});
			}, (Slider.duration + 100));
		}
	}
});
