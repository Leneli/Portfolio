"use strict";

//запустить какую-либо функцию, если element существует на странице
let forElement = function(element) {
	return new Promise(function(resolve) {
		if(element) {
			resolve();
		}
	});
};

//for SVG-elements in IE
(function() {
	svg4everybody(); 
})();
	