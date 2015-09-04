import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpSequence from 'gulp-sequence';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let watch = !!argv.watch;
let verbose = !!argv.verbose;

gulp.task('livereload', (cb) => {

  // This task runs only if the
  // watch argument is present!
  if (!watch) return cb();

  // Start livereload server
  livereload.listen({
    reloadPage: 'Extension',
    quiet: !verbose
  });
  gutil.log('Starting', gutil.colors.cyan('\'livereload-server\''));

  // Hint: Scripts are being watched by webpack!
  //       For more info checkout ./webpack.js

  gulp.watch('app/manifest.json', ['manifest']);
  gulp.watch('app/styles/**/*.css', ['styles:css']);
  gulp.watch('app/styles/**/*.less', ['styles:less']);
  gulp.watch('app/styles/**/*.scss', ['styles:sass']);
  gulp.watch('app/pages/**/*.html', ['pages']);
  gulp.watch('app/_locales/**/*', ['locales']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/fonts/**/*.{woff,ttf,eot,svg}', ['fonts']);

});
