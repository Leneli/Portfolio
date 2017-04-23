'use strict';

//var locals = require('/**/*.json');
const fs = require('fs');

module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.plumber())
      .pipe($.gp.pug({ pretty: '\t' }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          locals : JSON.parse(fs.readFileSync('content.json', 'utf8')),
          //locals : locals,
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};