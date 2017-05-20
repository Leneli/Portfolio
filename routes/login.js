const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const content = require("../content.json");
const crypto = require("crypto");


router.get("/", function (req, res) {
	let obj = {
		"title": "Авторизация",
		"metaData": content.metaData,
		"socials" : content.socials,
		"menu": content.menuIndex
	};
	Object.assign(obj, req.app.locals.settings);
	res.render("pages/login", obj);
});

router.post("/", (req, res) => {
	//проверить - указаны ли пароль и логин
	if(!req.body.login || !req.body.password) {
		return res.json({status: "Укажите логин и пароль!"});
	}

	//получаем модель пользователя и шифруем введенный пароль
	const Model = mongoose.model("user");
	const password = crypto
						.createHash("md5")
						.update(req.body.password)
						.digest("hex");
	//поиск пользователя с указанными данными
	Model
		.findOne({login: req.body.login, password: password})
		.then(item => {
			if(!item) {
				res.json({status: "Логин и/или пароль введены неверно!"});
			} else {
				// если пользователь найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
				req.session.isAdmin = true;
				res.json({status: "Авторизация успешна!"});
			}
		});
});

module.exports = router;