"use strict";

global.$ = {
	dev: true,
	package: require('./package.json'),
	config: require('./gulp/config'),
	path: {
		task: require('./gulp/paths/tasks.js'),
		jsFoundation: require('./gulp/paths/js.foundation.js'),
		cssFoundation: require('./gulp/paths/css.foundation.js'),
		app: require('./gulp/paths/app.js')
	},
	gulp: require('gulp'),
	del: require('del'),
	sassGlob: require("gulp-sass-glob"),
	merge: require('merge-stream'),
	browserify: require('browserify'),
	source: require('vinyl-source-stream'),
	buffer: require('vinyl-buffer'),
	babel: require('babelify'),
	browserSync: require('browser-sync').create(),
	fs: require('fs'),
	gp: require('gulp-load-plugins')({
		rename: {
			'gulp-replace-task': 'replaceTask'
		}
	})
};

$.path.task.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task("default", $.gulp.series(
	"clean",
	$.gulp.parallel(
		"sass",
		//"pug",
		"js:foundation",
		"js:process",
		"js:private",
		"copy:image",
		"copy:fonts",
		"copy:json",
		"css:foundation",
		"create:version",
		"sprite:svg",
		"sprite:png"
	),
	"nodemon",
	$.gulp.parallel(
		"watch",
		"serve"
	)
));

$.gulp.task("build", $.gulp.series(
	"clean",
	$.gulp.parallel(
		"sass",
		"js:foundation",
		"js:process",
		"js:private",
		"copy:image",
		"copy:fonts",
		"copy:json",
		"css:foundation",
		"create:version",
		"sprite:svg",
		"sprite:png"
	)
));