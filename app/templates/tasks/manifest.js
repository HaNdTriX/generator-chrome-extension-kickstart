import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import jsonTransform from 'gulp-json-transform';
import applyBrowserPrefixesFor from './lib/applyBrowserPrefixesFor';
import args from './lib/args';

gulp.task('manifest', () => {
  return gulp.src('app/manifest.json')
    .pipe(
      jsonTransform(
        applyBrowserPrefixesFor(args.vendor)
        , 2 /* whitespace */
      )
    )
    .pipe(gulp.dest(`dist/${args.vendor}`))
    .pipe(gulpif(args.watch, livereload()));
});
