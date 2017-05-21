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

//проверка на мобильное устройство
let isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },

    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};