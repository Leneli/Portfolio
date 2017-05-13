'use strict';

module.exports = function() {
  $.gulp.task('js:private', function() {
    return $.gulp.src("./source/js/private/*.js")
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};