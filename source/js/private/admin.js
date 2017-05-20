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


		//добавить запись в блог
		var formBlog = document.getElementById("formBlog");

		formBlog.addEventListener("submit", sendPost);

		function sendPost(e) {
			e.preventDefault();
			let data = {
				title: formBlog.title.value,
				date: formBlog.date.value,
				text: formBlog.text.value
			};
			console.log(data);
		}
	});
})();
