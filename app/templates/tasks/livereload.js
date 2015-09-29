import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpSequence from 'gulp-sequence';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('livereload', (cb) => {

  // This task runs only if the
  // watch argument is present!
  if (!args.watch) return cb();

  // Start livereload server
  livereload.listen({
    reloadPage: 'Extension',
    quiet: !args.verbose
  });

  gutil.log('Starting', gutil.colors.cyan('\'livereload-server\''));

  // The watching for javascript files is done by webpack
  // Check out ./tasks/scripts.js for further info.
  gulp.watch('app/manifest.json', ['manifest']);
  gulp.watch('app/styles/**/*.css', ['styles:css']);
  gulp.watch('app/styles/**/*.less', ['styles:less']);
  gulp.watch('app/styles/**/*.scss', ['styles:sass']);
  gulp.watch('app/pages/**/*.html', ['pages']);
  gulp.watch('app/_locales/**/*', ['locales']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/fonts/**/*.{woff,ttf,eot,svg}', ['fonts']);

});
