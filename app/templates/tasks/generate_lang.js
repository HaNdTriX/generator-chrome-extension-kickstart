var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

/***********************************************************
 * Configue
 ***********************************************************/
var src = 'app/_locales/en/*.json';
var dest = 'app/_locales';
var availableLangs = [
  "ar", "am", "bg", "bn", "ca", "cs", "da", "de", "el", "en_GB", "en_US", "es", "es_419", "et", "fa", "fi", "fil", "fr", "gu", "he", "hi", "hr", "hu", "id", "it", "ja", "kn", "ko", "lt", "lv", "ml", "mr", "ms", "nl", "no", "pl", "pt_BR", "pt_PT", "ro", "ru", "sk", "sl", "sr", "sv", "sw", "ta", "te", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"
];

/***********************************************************
 * Utils
 ***********************************************************/
function isValidLanguage(langCode) {
  return availableLangs.indexOf(langCode) > -1;
}

function filterUserLangs(langs) {
  return langs.filter(function(langCode) {

    if (langCode === 'en') {
      gutil.warn('Skipping "en" because it is the default language.');
      return false;
    }

    if (!isValidLanguage(langCode)) {
      gutil.warn('Skipping: "', langCode, '" because it is not a valid chrome language.');
      return false;
    }

    return true;
  });
}

function setMaxListeners(n) {
  require('events').EventEmitter.prototype._maxListeners = n;
}

/***********************************************************
 * Task
 ***********************************************************/

gulp.task('generate:lang', function() {
  var langs;
  var langDirs;

  // Supress warning
  setMaxListeners(100);

  if (argv.all && argv.langs) {
    gutil.error('Too many aguments. Please supply either --langs or --all');
    return;
  }

  // Generate selected language files
  if (argv.langs) {
    // Remove invalid languages
    langs = filterUserLangs(argv.langs.split(','));
    if (!langs.length) {
      gutil.error('No valid Languages');
      return;
    }
  }

  // Generate language files for all languages
  if (argv.all) {
    gutil.log('Generating all possible language files');
    langs = availableLangs;
  }

  // Create Stream
  var stream = gulp.src(src);

  // Generate each lang
  langs.forEach(function(langCode) {
    var target = dest + '/' + langCode;

    // Make sure we do not overwrite any translations
    if (fs.existsSync(target)) {
      gutil.warn('Skipping: ' + langCode + ' because it already exists!');
      return;
    }

    gutil.log('Generating: ', langCode);
    stream.pipe(gulp.dest(target));
  });

});
