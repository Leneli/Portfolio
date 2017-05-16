const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    let obj = {
        title: "Добро пожаловать на сайт веб-разработчика",

        "menu": [
            {
                "name": "Мои работы",
                "href": "/works.html"
            }, {
                "name": "Обо мне",
                "href": "/about.html"
            }, {
                "name": "Блог",
                "href": "/blog.html"
            }, {
                "name": "Авторизация",
                "href": "/index.html"
            }
        ],

        "menuIndex": [
            {
                "name": "Мои работы",
                "href": "/works.html"
            }, {
                "name": "Обо мне",
                "href": "/about.html"
            }, {
                "name": "Блог",
                "href": "/blog.html"
            }
        ],

        "metaData": [{
            "auth": "Elena",
            "desc": "Портфолио веб-разработчика",
            "keyw": "frontend, web, фронтенд, веб-разработка"
        }]
    };
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/index", obj);
});

router.get("/blog", function (req, res) {
	let obj = {
		title: "Блог веб-разработчика"
	};
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/blog", obj);
});

module.exports = router;