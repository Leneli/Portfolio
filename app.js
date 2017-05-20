const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const http = require("http");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const jsonfile = require("jsonfile");
const fileVersionControl = "version.json";
const currentStatic = require("./gulp/config").root;
const config = require("./config");

// получаем абсолютный путь к папке upload, в которую будут загружаться картинки проектов
const uploadDir = path.join(__dirname, config.upload);

//подключаем базу данных
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:iZ6CUI3B@ds151049.mlab.com:51049/portfolio");
/*mongoose
	.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
		user: config.db.user,
		pass: config.db.password
	})
	.catch(e => {
		console.error(e);
		throw e;
	});*/

require("./models/db-close");
//подключаем модели(сущности, описывающие коллекции базы данных)
require("./models/blog");
require("./models/pic");
require("./models/user");

//подключение движка
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//куки
app.use(session({
	secret: "secret",
	key: "keys",
	cookie: {
		path: "/",
		httpOnly: true,
		maxAge: null
	},
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
//статика
app.use(express.static(path.join(__dirname, currentStatic)));

//роуты страниц
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin"));
app.use("/works", require("./routes/works"));
app.use("/login", require("./routes/login"));


// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
	res.status(404);
	res.render("404");
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

server.listen(3000, "localhost");
server.on("listening", function () {
	jsonfile
		.readFile(fileVersionControl, function (err, obj) {
			if (err) {
				console.log("Данные для хеширования ресурсов из version.json не прочитаны");
				console.log("Сервер остановлен");
				process.exit(1);
			} else {
				app.locals.settings = {
					suffix: obj.suffix,
					version: obj.version
				};
				console.log("Данные для хеширования ресурсов из version.json прочитаны");

				//если такой папки нет - создаем ее
				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir);
				}

				console.log("Express server started on port %s at %s", server.address().port, server.address().address);
			}
		});
});