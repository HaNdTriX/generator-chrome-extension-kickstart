import gulp from 'gulp';
import zip from 'gulp-zip';
import packageDetails from '../package.json';

gulp.task('compress', () => {
  let name = packageDetails.name;
  let version = packageDetails.version;
  let filename = `${name}-${version}.zip`;
  gulp.src('dist/*')
    .pipe(zip(filename))
    .pipe(gulp.dest('./packages'));
});
