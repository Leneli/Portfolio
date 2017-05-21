"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	WorkSchema = new Schema({
		name: {
			type: String,
			required: [true, "Укажите название работы"]
		},
		tech: {
			type: String,
			required: [true, "Укажите используемые технологии"]
		},
		link: {
			type: String,
			required: [true, "Укажите ссылку на работу"]
		},
		picture: {
			type: String
		}
	});

mongoose.model("work", WorkSchema);