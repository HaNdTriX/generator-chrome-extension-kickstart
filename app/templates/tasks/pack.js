import gulp from 'gulp';
import { colors, log } from 'gulp-util';
import zip from 'gulp-zip';
import packageDetails from '../package.json';

gulp.task('pack', () => {
  let name = packageDetails.name;
  let version = packageDetails.version;
  let filename = `${name}-${version}.zip`;
  return gulp.src('dist/**/*')
    .pipe(zip(filename))
    .pipe(gulp.dest('./packages'))
    .on('end', () => {
      let distStyled = colors.gray('./dist');
      let filenameStyled = colors.gray(`./packages/${filename}`);
      log(`Packed ${distStyled} to ${filenameStyled}`);
    });
});
