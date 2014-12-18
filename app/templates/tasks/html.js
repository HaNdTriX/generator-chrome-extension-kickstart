var gulp = require('gulp');
var watch = require('gulp-watch');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/html/*.html';
var dest = 'dist/html';

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('html', function() {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('html:dev', function() {
  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest));
});