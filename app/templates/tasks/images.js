var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/images/**/*';
var dest = 'dist/images';

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('images', function() {
  return gulp.src(src)
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('images:dev', function() {
  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest));
});