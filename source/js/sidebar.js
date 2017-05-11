//Sidebar
//jQuery
let blog = document.getElementById("blog");

//если элемент blog существует
forElement(blog).then(function () {
	//модуль Sidebar
	let scrollSidebar = (function () {
		let sidebar = $(".sidebar"),
			menu = $(".sidebar-nav"),
			link = $(".sidebar__link"),
			article = $(".article"),
			body = document.body,
			isPositionArticle = [],
			offsetHeight = $(".blog__content")[0].offsetTop - $(".main")[0].offsetTop;

		let positionArticle = function (el) {
			for (let i = 0; i < el.length; i++) {
				isPositionArticle[i] = {};
				isPositionArticle[i].top = el
					.eq(i)
					.offset()
					.top - offsetHeight;
				isPositionArticle[i].bottom = isPositionArticle[i].top + el
					.eq(i)
					.innerHeight();
			}
		};

		let menuFixed = function () {
			let scroll = window.pageYOffset;

			if (scroll < article.offset().top) {
				sidebar.removeClass("fixed");
				$(".blog__content").removeClass("nav-fixed");
			}
			else {
				sidebar.addClass("fixed");
				$(".blog__content").addClass("nav-fixed");
			}
		};

		let scrollPage = function (e) {
			let scroll = window.pageYOffset;

			for (let i = 0; i < isPositionArticle.length; i++) {
				if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
					link
						.eq(i)
						.addClass("sidebar__link_active")
						.siblings()
						.removeClass("sidebar__link_active");
				}
			}
		};

		let clickOnMenu = function (e) {
			let index = $(e.target).index();
			let sectionOffset = article
				.eq(index)
				.offset()
				.top;
			$(document).off("scroll", scrollPage);
			$("body, html").animate({
				"scrollTop": sectionOffset
			}, function () {
				$(e.target)
					.addClass("sidebar__link_active")
					.siblings()
					.removeClass("sidebar__link_active");
				$(document).on("scroll", scrollPage);
			});
		};

		let addListener = function () {
			$(menu).on("click", clickOnMenu);

			$(document).on("scroll", scrollPage);
			$(document).on("scroll", menuFixed);

			$(window).on("load", function (e) {
				positionArticle(article);
			})

			$(window).on("resize", function (e) {
				positionArticle(article);
			})
		}

		return {
			init: addListener
		}
	})();

	scrollSidebar.init();

	//toggle class 
	$("#btn").on("click", function () {
		$("#blog").toggleClass("on");
	});
});	
