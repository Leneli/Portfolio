//Parallax
(function () {
	document.addEventListener("DOMContentLoaded", function () {
		let layers = document.getElementsByClassName("parallax__layer"),
			parallax = document.getElementById("parallax"),
			wrapper = document.getElementsByClassName("wrapper")[0],
			noParallax = document.createElement("div");

		let moveLaers = function (e) {
			e = e || event;

			let initialX = (window.innerWidth / 2) - e.pageX,
				initialY = (window.innerHeight / 2) - e.pageY;

			for (let i = 0; i < layers.length; i++) {
				let divider;

				if (layers.length >= 5) divider = i / 100;
				else divider = (i + 1) / 100;

				let X = initialX * divider,
					Y = initialY * divider,
					transformStyle = "translate3d(" + X + "px, " + Y + "px, " + "0)";

				layers[i].style.transform = transformStyle;
			}
		};

		if(isMobile.any()) {
			wrapper.removeChild(parallax);
			noParallax.className = "parallax bg_forest-bottom";
			wrapper.insertBefore(noParallax, document.getElementsByClassName("footer")[0]);

		} else {
			window.addEventListener("mousemove", moveLaers);
		}
	});
})();
