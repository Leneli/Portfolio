const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const content = require('../content.json');

router.get("/", function (req, res) {
	let obj = {
		"title": "Мои работы",
		"metaData": content.metaData,
		"socials" : content.socials,
		"menu": content.menu,
		"leftTraingleClass": "traingle_works",
		"rightTraingleClass": "traingle_works",
		"headerClass": "bg_forest-full",
		"headerSubClass": "header__content_about"
	};
	Object.assign(obj, req.app.locals.settings);

	const Model = mongoose.model("work");
	Model
		.find()
        .then(slides => {
            Object.assign(obj, {slides: slides});
            res.render("pages/works", obj);
        });
});

/*router.post('/', function (req, res) {
		//требуем наличия имени, обратной почты и текста
	if (!req.body.name || !req.body.email || !req.body.text) {
		//если что-либо не указано - сообщаем об этом
		return res.json({status: 'Укажите данные!'});
	}
		//инициализируем модуль для отправки писем и указываем данные из конфига
	const transporter = nodemailer.createTransport(config.mail.smtp);
	const mailOptions = {
		from: `"${req.body.name}" <${req.body.email}>`,
		to: config.mail.smtp.auth.user,
		subject: config.mail.subject,
		text: req
		.body
		.text
		.trim()
		.slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
	};
	//отправляем почту
	transporter.sendMail(mailOptions, function (error, info) {
		//если есть ошибки при отправке - сообщаем об этом
		if (error) {
			return res.json({status: 'При отправке письма произошла ошибка'});
		}
		res.json({status: 'Письмо успешно отправлено'});
	});
});*/

module.exports = router;