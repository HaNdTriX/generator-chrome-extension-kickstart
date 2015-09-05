import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let watch = !!argv.watch;

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*.{woff,ttf,eot,svg}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulpif(watch, livereload()));
});
