"use strict";

(function() {
	//for SVG-elements in IE
	svg4everybody(); 
})();

//запустить какую-либо функцию, если element существует на странице
let forElement = function(element) {
	return new Promise(function(resolve) {
		if(element) {
			resolve();
		}
	});
};
