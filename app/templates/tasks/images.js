import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulpif(production, imagemin()))
    .pipe(gulp.dest('dist/images'))
    .pipe(gulpif(watch, livereload()));
});
