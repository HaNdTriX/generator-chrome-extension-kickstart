import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

gulp.task('pages', () => {
  return gulp.src('app/pages/**/*.html')
    .pipe(gulp.dest('dist/pages'))
    .pipe(gulpif(watch, livereload()));
});
