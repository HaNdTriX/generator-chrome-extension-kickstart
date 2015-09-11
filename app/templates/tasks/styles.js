import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-minify-css';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

gulp.task('styles:css', function() {
  return gulp.src('app/styles/*.css')
    .pipe(gulpif(production, minifyCSS()))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulpif(watch, livereload()));
});

gulp.task('styles:less', function() {
  return gulp.src('app/styles/*.less')
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(less({ paths: ['./app']}).on('error', function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(gulpif(production, minifyCSS()))
    .pipe(gulpif(!production, sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulpif(watch, livereload()));
});

gulp.task('styles:sass', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({ includePaths: ['./app']}).on('error', function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(gulpif(production, minifyCSS()))
    .pipe(gulpif(!production, sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulpif(watch, livereload()));
});

gulp.task('styles', [
  'styles:css',
  'styles:less',
  'styles:sass'
]);
