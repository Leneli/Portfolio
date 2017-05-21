const mongoose = require("mongoose");
const readline = require("readline");
const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
const config = require("./config");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:iZ6CUI3B@ds151049.mlab.com:51049/portfolio");
require("./models/db-close");

let login = "",
	password = "";

rl.question("Логин: ", answer => {
	login = answer;

	rl.question("Пароль: ", answer => {
		password = answer;

		rl.close();
	});
});

//когда ввод будет завершен
rl.on("close", () => {
	require("./models/user");

	const User = mongoose.model("user");
	const admin = new User({login: login, password: password});

	User
		.findOne({login: login})
		.then(u => {
			if(u) {
				throw new Error("Такой пользователь уже существует!");
			}

			return admin.save();
		})
		.then(u => console.log("Пользователь успешно создан!"), e => console.error(e.message))
		.then(() => process.exit(0));
});