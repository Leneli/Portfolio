//Admin panel
'use strict';

(function() {
	document.addEventListener("DOMContentLoaded", function() {

		//Табы
		var tab = document.querySelector(".tabs"),
			div = document.querySelector(".tabs__content").children,
			tabActiveClass = "tabs__li_active",
			divActiveClass = "tab-active";

		tab.children[0].classList.add(tabActiveClass);
		div[0].classList.add(divActiveClass);

		tab.addEventListener("click", function(event) {
			event = event || window.event;
			let activeTab = event.target;

			for(let i = 0; i < tab.children.length; i++) {
				if(tab.children[i].classList.contains(tabActiveClass) && tab.children[i] !== activeTab) {
					tab.children[i].classList.remove(tabActiveClass);
				}

				if(div[i].classList.contains(divActiveClass)) {
					div[i].classList.remove(divActiveClass);
				}

				if(tab.children[i] === activeTab) {
					div[i].classList.add(divActiveClass);
				}
			}
			activeTab.classList.add(tabActiveClass);
		});

		//загрузка изображений
		const formUpload = document.querySelector('#upload');

		formUpload.addEventListener('submit', prepareSendFile);

		function prepareSendFile(e) {
			e.preventDefault();
			let resultContainer = formUpload.querySelector('.status');
			let formData = new FormData();

			let file = document
				.querySelector('#file-select')
				.files[0];
			let name = document
				.querySelector('#file-desc')
				.value;

			formData.append('photo', file, file.name);
			formData.append('name', name);

			resultContainer.innerHTML = 'Uploading...';
			upload('/admin/upload', formData, function (data) {
				resultContainer.innerHTML = data;
				formUpload.reset();
			});
		}

		//добавить запись в блог
		const formBlog = document.querySelector('#formBlog');

		formBlog.addEventListener('submit', prepareSendPost);

		function prepareSendPost(e) {
			e.preventDefault();
			let data = {
				title: formBlog.title.value,
				date: formBlog.date.value,
				text: formBlog.text.value
			};
			prepareSend('/admin/addpost', formBlog, data);
		};


	});
})();


//Upload
var upload = function (url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
	};
	xhr.send(data);
};

//Ajax
var sendAjax = function(url, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    let result;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извините в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
};

//prepareSend
var prepareSend = function(url, form, data, cb) {
  let resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  sendAjax(url, data, function (data) {
    form.reset();
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
};