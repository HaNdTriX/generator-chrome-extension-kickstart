var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var glob = require('glob');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var path = require('path');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
// var reactify = require('reactify');

/***********************************************************
 * Configue
 ***********************************************************/
var SRC = 'app/scripts/*.js';
var DEST = 'dist/scripts';
var LIVERELOAD_PORT = 35729;

/***********************************************************
 * Watch
 ***********************************************************/


function bundle(b, filename, development) {
  return b.bundle()

    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))

    // Gulpify
    .pipe(source(filename))

    // Uglify
    .pipe(gulpif(!development, buffer()))
    .pipe(gulpif(!development, uglify()))

    // Save
    .pipe(gulp.dest(DEST))

    // Trigger livereload
    .pipe(gulpif(development, livereload()));

}

function browserifyEach(baseFilePath, development) {

  // Get the filename
  var filename = path.basename(baseFilePath);

  // Configure browserify
  var b = browserify({

    // Select bundle
    entries: './' + baseFilePath,

    // Enable Source Maps
    debug: development,

    // Needed for watchify
    cache: {},
    packageCache: {},
    fullPaths: development

  });

  if (development) {

    // Watch files
    b = watchify(b);

    // Rebundle on filechange
    b.on('update', function(file) {
      gutil.log(filename, 'changed');
      bundle(b, filename, development);
    });

  }

  // Add transforms here
  // b.transform(reactify);

  bundle(b, filename, development);

}

function buildBundles(src, development) {
  glob(src, function(err, files) {
    files.forEach(function(file) {
      browserifyEach(file, development);
    });
  });
}

gulp.task('scripts', function() {
  buildBundles(SRC);
});

gulp.task('scripts:dev', function() {
  livereload.listen(LIVERELOAD_PORT);
  gutil.log('Chromereload listen on port', LIVERELOAD_PORT);
  buildBundles(SRC, true);
});
