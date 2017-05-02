window.onload = function() {
	"use strict";

	let authorize = document.getElementById("authorize"),
		flipClass = "flipper";

	//login form
	authorize.addEventListener("click", runFlip);


	//flip effect
	function runFlip() {
		let elem = document.getElementById(this.dataset.flipId),
			classes = elem.classList;

		classes.contains(flipClass) === true ? classes.remove(flipClass) : classes.add(flipClass);
	}

	//перевернуть карту при клике вне ее
	document.body.addEventListener("click", function(e) {
		if(!e) e = window.event;
    	let elems = e.path,
			flag = true;

		for(let i = 0; i < elems.length; i++) {
			if(elems[i].id === "authorize" || elems[i].id === "login") {
				flag = false;	
			}
		}

		if(flag) document.getElementById("login").classList.remove(flipClass);
	});

};