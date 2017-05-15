//Parallax
(function() {
	document.addEventListener("DOMContentLoaded", function() {
			let layers = document.getElementsByClassName("parallax__layer"),
	parallax;

	let moveLaers = function(e) {
		e = e || event;

		let initialX = (window.innerWidth / 2) - e.pageX,
			initialY = (window.innerHeight / 2) - e.pageY;

		for(let i = 0; i < layers.length; i++) {
			let divider;

			if(layers.length >= 5) divider = i / 100;
			else divider = (i + 1) / 100;

			let X = initialX * divider,
				Y = initialY * divider,
				transformStyle = "translate3d(" + X + "px, " + Y + "px, " + "0)";

			layers[i].style.transform = transformStyle;
		}
	};

	window.addEventListener("mousemove", moveLaers);
	});
})();

