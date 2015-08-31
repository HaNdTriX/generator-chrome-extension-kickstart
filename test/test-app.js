'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('chrome-extension-kickstart:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        name: 'test-extension',
        shortName: 'test-ext',
        description: 'Lorem Ipsum',
        action: 'Browser',
        overridePage: 'Newtab Page',
        uifeatures: [
          'options',
          'devtoolsPage',
          'contentscript',
          'omnibox'
        ],
        permissions: [
          'alarms',
          'bookmarks',
          'browsingData',
          'clipboardRead',
          'clipboardWrite',
          'contentSettings',
          'contextMenus',
          'cookies',
          'commands',
          'debugger',
          'declarativeContent',
          'desktopCapture',
          'downloads',
          'enterprise.platformKeys',
          'fontSettings',
          'gcm',
          'history',
          'identity',
          'idle',
          'input',
          'management',
          'notifications',
          'pageCapture',
          'proxy',
          'pushMessaging',
          'system.cpu',
          'system.memory',
          'system.storage',
          'tts',
          'ttsEngine',
          'tabs',
          'tabCapture',
          'topSites',
          'webNavigation',
          'webRequest',
          'webRequestBlocking'
        ]
      })
      .on('end', done);
  });

  it('creates base files', function() {
    assert.file([
      'package.json',
      '.editorconfig',
      '.eslintrc',
      '.gitattributes',
      '.gitignore',
      'README.md'
    ]);
  });

  it('creates tasks', function() {
    assert.file([
      'gulpfile.babel.js',
      'tasks/clean.js',
      'tasks/compress.js',
      'tasks/default.js',
      'tasks/fonts.js',
      'tasks/images.js',
      'tasks/livereload.js',
      'tasks/locales.js',
      'tasks/manifest.js',
      'tasks/pages.js',
      'tasks/scripts.js',
      'tasks/styles.js',
      'tasks/version.js'
    ]);
  });

  it('creates artworks', function() {
    assert.file([
      'artworks/Chrome-Webstore-Icon_128x128.png',
      'artworks/Promo-Image-Large_920x680.png',
      'artworks/Promo-Image-Marquee_1400x560.png',
      'artworks/Promo-Image-Small_440x280.png',
      'artworks/Screenshot_1280x800.png',
      'artworks/Screenshot_640x400.png',
    ]);
  });

  it('creates locales', function() {
    assert.file([
      'app/_locales/en/messages.json'
    ]);

    assert.fileContent([
      ['app/manifest.json', /"default_locale":\s"en",/]
    ]);
  });

  it('creates fonts directory', function() {
    assert.file([
      'app/fonts/.gitkeep'
    ]);
  });

  it('creates devtools page', function() {
    assert.file([
      'app/pages/devtools.html',
      'app/devtools.js',
      'app/styles/devtools.less'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"minimum_chrome_version":\s"10\.0"/],
      ['app/manifest.json', /"devtools_page":\s"pages\/devtools\.html"/]
    ]);
  });

  it('creates newtab files', function() {
    assert.file([
      'app/pages/newtab.html',
      'app/newtab.js',
      'app/styles/newtab.less'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"newtab":\s"pages\/newtab\.html"/]
    ]);
  });

  it('creates all popup files', function() {
    assert.file([
      'app/pages/popup.html',
      'app/popup.js',
      'app/styles/popup.less'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"default_popup":\s"pages\/popup\.html"/]
    ]);
  });

  it('creates options', function() {
    assert.file([
      'app/pages/options.html',
      'app/options.js',
      'app/styles/options.less'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"options_page":\s"pages\/options\.html"/]
    ]);
  });

  it('creates contentscripts', function() {
    assert.file([
      'app/contentscript.js',
      'app/styles/contentscript.less'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"content_scripts":\s\[/]
    ]);
  });

  it('creates a background page', function() {
    assert.file([
      'app/background.js'
    ]);
    assert.fileContent([
      ['app/manifest.json', /"background":\s\{/]
    ]);
  });

  it('sets permissions to manifest', function() {
    assert.fileContent([
      ['app/manifest.json', /"alarms"/],
      ['app/manifest.json', /"bookmarks"/],
      ['app/manifest.json', /"browsingData"/],
      ['app/manifest.json', /"clipboardRead"/],
      ['app/manifest.json', /"clipboardWrite"/],
      ['app/manifest.json', /"contentSettings"/],
      ['app/manifest.json', /"contextMenus"/],
      ['app/manifest.json', /"cookies"/],
      ['app/manifest.json', /"commands"/],
      ['app/manifest.json', /"debugger"/],
      ['app/manifest.json', /"declarativeContent"/],
      ['app/manifest.json', /"desktopCapture"/],
      ['app/manifest.json', /"downloads"/],
      ['app/manifest.json', /"enterprise.platformKeys"/],
      ['app/manifest.json', /"fontSettings"/],
      ['app/manifest.json', /"gcm"/],
      ['app/manifest.json', /"history"/],
      ['app/manifest.json', /"identity"/],
      ['app/manifest.json', /"idle"/],
      ['app/manifest.json', /"input"/],
      ['app/manifest.json', /"management"/],
      ['app/manifest.json', /"notifications"/],
      ['app/manifest.json', /"pageCapture"/],
      ['app/manifest.json', /"proxy"/],
      ['app/manifest.json', /"pushMessaging"/],
      ['app/manifest.json', /"system\.cpu"/],
      ['app/manifest.json', /"system\.memory"/],
      ['app/manifest.json', /"system\.storage"/],
      ['app/manifest.json', /"tts"/],
      ['app/manifest.json', /"ttsEngine"/],
      ['app/manifest.json', /"tabs"/],
      ['app/manifest.json', /"tabCapture"/],
      ['app/manifest.json', /"topSites"/],
      ['app/manifest.json', /"webNavigation"/],
      ['app/manifest.json', /"webRequest"/],
      ['app/manifest.json', /"webRequestBlocking"/],
      ['app/manifest.json', /\s+"http:\/\/\*\/\*",\s+"https:\/\/\*\/\*"/],
    ]);
  });

});
