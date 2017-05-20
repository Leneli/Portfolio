const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const content = require('../content.json');


router.get("/", function (req, res) {
	let obj = {
		"title": "Добро пожаловать на сайт веб-разработчика",
		"metaData": content.metaData,
		"socials" : content.socials,
		"menu": content.menuIndex
	};
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/index", obj);
});

// ABOUT
router.get("/about", function (req, res) {
	let obj = {
		"title": "Немного обо мне",
		"metaData": content.metaData,
		"socials": content.socials,
		"menu": content.menu,
		"Frontend": content.Frontend,
		"Backend": content.Backend,
		"WorkFlow": content.WorkFlow,
		"leftTraingleClass": "traingle_about-left",
		"rightTraingleClass": "traingle_about-right",
		"headerClass": "bg_forest-full",
		"headerSubClass": "header__content_about"
	};
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/about", obj);
});

// BLOG
router.get("/blog", function (req, res) {
	let obj = {
		"title": "Блог",
		"metaData": content.metaData,
		"socials" : content.socials,
		"menu": content.menu,
		"leftTraingleClass": "traingle_blog",
		"rightTraingleClass": "traingle_blog",
		"headerClass": "bg_forest-full header_blog",
		"headerSubClass": "header__content_blog"
	};
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/blog", obj);
});

module.exports = router;