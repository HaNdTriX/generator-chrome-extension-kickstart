import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let watch = !!argv.watch;

gulp.task('manifest', () => {
  gulp.src('app/manifest.json')
    .pipe(gulp.dest('dist'))
    .pipe(gulpif(watch, livereload()));
});