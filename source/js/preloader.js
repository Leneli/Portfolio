//Preloader
//jQuery
let preloader = (function () {
	let percents = 0,
		preloader = $("#preloader");

	let imgPath = $("*").map(function (i, el) {
		let bg = $(el).css("background-image"),
			img = $(el).is("img"),
			path = "";

		if (bg != "none" && bg != 'url("http://localhost:3000/assets/img/bg/preloader.jpg")') {
			path = bg.replace('url("', '').replace('")', '');;
		}

		if (img) {
			path = $(el).attr("src");
		}

		if (path) return path;
	});

	let setPercents = function (total, current) {
		let persents = Math.ceil(current / total * 100);

		$('#percrnts').text(persents);

		if (persents >= 100) {
			preloader.fadeOut();
		}
	}

	let loadImages = function (images) {

		if (!images.length) preloader.fadeOut();

		images.forEach(function (img, i, images) {
			let fakeImage = $('<img>', {
				attr: {
					src: img
				}
			});

			fakeImage.on('load error', function () {
				percents++;
				setPercents(images.length, percents);
			});
		});
	}

	return {
		init: function () {
			let imgs = imgPath.toArray();

			loadImages(imgs);
		}
	}
}());


$(function () {
	preloader.init();
});
