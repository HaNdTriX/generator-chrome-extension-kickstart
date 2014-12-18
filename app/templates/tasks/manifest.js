var gulp = require('gulp');
var jsonTransform = require('gulp-json-transform');
var watch = require('gulp-watch');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/manifest.json';
var dest = 'dist';

/***********************************************************
 * Build
 ***********************************************************/
gulp.task('manifest:incBuildNo', function(cb) {

  var versionUp = function(numbers, index) {
    if (!numbers[index]) {
      throw 'Build number overflow ' + numbers;
    }
    if (numbers[index] + 1 <= 65535) {
      numbers[index]++;
      return numbers.join('.');
    } else {
      versionUp(numbers, ++index);
    }
  };

  var incVersionNo = jsonTransform(function(manifest) {
    var buildnumber = manifest.version.split('.');
    manifest.version = versionUp(buildnumber, buildnumber.length - 1);
    return manifest;
  }, '  ');

  return gulp.src(src)
    .pipe(incVersionNo)
    .pipe(gulp.dest('app'));
});

gulp.task('manifest', function(cb) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

/***********************************************************
 * Watch
 ***********************************************************/
gulp.task('manifest:dev', function(cb) {

  return gulp.src(src)
    .pipe(watch(src))
    .pipe(gulp.dest(dest));

});