'use strict';

module.exports = function() {
  $.gulp.task('js:map', function() {
    return $.gulp.src("./source/js/map/google.map.js")
      .pipe($.gp.concat('google.map.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};