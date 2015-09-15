import gulp from 'gulp';
import gutil from 'gulp-util';
import zip from 'gulp-zip';
import packageDetails from '../package.json';

gulp.task('compress', () => {
  let name = packageDetails.name;
  let version = packageDetails.version;
  let filename = `${name}-${version}.zip`;
  gulp.src('dist/*')
    .pipe(zip(filename))
    .pipe(gulp.dest('./packages'))
    .on('end', () => {
      let distStyled = gutil.colors.gray(`./dist`);
      let filenameStyled = gutil.colors.gray(`./packages/${filename}`);
      gutil.log(`Compressed ${distStyled} to ${filenameStyled}`);
    });
});
