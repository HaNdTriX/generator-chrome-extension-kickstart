var gulp = require('gulp');
var watch = require('gulp-watch');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/_locales/**/*';
var dest = 'dist/_locales';

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('locales', function() {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('locales:dev', function() {
  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest));
});