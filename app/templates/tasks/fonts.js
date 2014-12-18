var gulp = require('gulp');
var watch = require('gulp-watch');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/fonts/**/*';
var dest = 'dist/fonts';

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('fonts', function() {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('fonts:dev', function() {
  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest));
});