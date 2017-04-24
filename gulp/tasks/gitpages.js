'use strict';

module.exports = function() {
  $.gulp.task('gitpages', function() {
    return $.gulp.src('./build/**/*.*')
      .pipe($.gulp.dest("../leneli.github.io"));
  })
};