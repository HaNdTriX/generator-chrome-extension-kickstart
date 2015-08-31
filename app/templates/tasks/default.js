import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('default', gulpSequence(
  'clean', [
    'manifest',
    'scripts',
    'styles',
    'pages',
    'locales',
    'images',
    'fonts',
    'livereload'
  ]
));
