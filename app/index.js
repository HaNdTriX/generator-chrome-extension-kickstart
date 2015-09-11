'use strict';
var path = require('path');
var util = require('util');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

  initializing: function() {
    // load package
    this.pkg = require('../package.json');

    // set source root path to templates
    this.sourceRoot(path.join(__dirname, 'templates'));

    // init extension manifest data
    this.manifest = {
      permissions: {}
    };
  },

  prompting: function() {
    var cb = this.async();

    var prompts = [{
      name: 'name',
      message: 'What would you like to call this extension?',
      default: (this.appname) ? this.appname : 'myAwesomeChromeApp'
    }, {
      name: 'shortName',
      message: 'And how would you call it if you only had 12 characters (short_name)?',
      default: (this.shortName) ? this.shortName : 'myChromeApp'
    }, {
      name: 'description',
      message: 'How would you like to describe this extension?',
      default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, {
      type: 'list',
      name: 'action',
      message: 'Would you like to use UI Action?',
      choices: [
        'No',
        'Browser',
        'Page'
      ]
    }, {
      type: 'list',
      name: 'overridePage',
      message: 'Would you like to a override chrome page?',
      choices: [
        'No',
        'Bookmarks Page',
        'History Page',
        'Newtab Page'
      ]
    }, {
      type: 'checkbox',
      name: 'uifeatures',
      message: 'Would you like more UI Features?',
      choices: [{
        value: 'options',
        name: 'Options Page',
        checked: false
      }, {
        value: 'devtoolsPage',
        name: 'Devtools Page',
        checked: false
      }, {
        value: 'contentscript',
        name: 'Content Scripts',
        checked: false
      }, {
        value: 'omnibox',
        name: 'Omnibox',
        checked: false
      }]
    }, {
      type: 'checkbox',
      name: 'permissions',
      message: 'Would you like to use permissions?',
      choices: [{
        value: 'alarms',
        name: 'Alarms',
        checked: false
      }, {
        value: 'bookmarks',
        name: 'Bookmarks',
        checked: false
      }, {
        value: 'browsingData ',
        name: 'BrowsingData ',
        checked: false
      }, {
        value: 'clipboardRead',
        name: 'ClipboardRead',
        checked: false
      }, {
        value: 'clipboardWrite',
        name: 'ClipboardWrite',
        checked: false
      }, {
        value: 'contentSettings',
        name: 'ContentSettings',
        checked: false
      }, {
        value: 'contextMenus',
        name: 'ContextMenus',
        checked: false
      }, {
        value: 'cookies',
        name: 'Cookies',
        checked: false
      }, {
        value: 'commands',
        name: 'Commands',
        checked: false
      }, {
        value: 'debugger',
        name: 'Debugger',
        checked: false
      }, {
        value: 'declarativeContent',
        name: 'DeclarativeContent',
        checked: false
      }, {
        value: 'desktopCapture',
        name: 'DesktopCapture',
        checked: false
      }, {
        value: 'downloads',
        name: 'Downloads',
        checked: false
      }, {
        value: 'enterprise.platformKeys',
        name: 'Enterprise.platformKeys',
        checked: false
      }, {
        value: 'fontSettings',
        name: 'FontSettings',
        checked: false
      }, {
        value: 'gcm ',
        name: 'gcm ',
        checked: false
      }, {
        value: 'history',
        name: 'History',
        checked: false
      }, {
        value: 'identity',
        name: 'Identity',
        checked: false
      }, {
        value: 'idle',
        name: 'Idle',
        checked: false
      }, {
        value: 'input',
        name: 'Input',
        checked: false
      }, {
        value: 'management',
        name: 'Management',
        checked: false
      }, {
        value: 'notifications',
        name: 'Notifications',
        checked: false
      }, {
        value: 'pageCapture',
        name: 'PageCapture',
        checked: false
      }, {
        value: 'proxy',
        name: 'Proxy',
        checked: false
      }, {
        value: 'pushMessaging',
        name: 'PushMessaging',
        checked: false
      }, {
        value: 'system.cpu',
        name: 'system.cpu',
        checked: false
      }, {
        value: 'system.memory',
        name: 'system.memory',
        checked: false
      }, {
        value: 'system.storage',
        name: 'system.storage',
        checked: false
      }, {
        value: 'tts',
        name: 'TextToSpeech',
        checked: false
      }, {
        value: 'ttsEngine',
        name: 'TextToSpeechEngine',
        checked: false
      }, {
        value: 'tabs',
        name: 'Tabs',
        checked: false
      }, {
        value: 'tabCapture',
        name: 'TabCapture',
        checked: false
      }, {
        value: 'topSites',
        name: 'TopSites',
        checked: false
      }, {
        value: 'webNavigation',
        name: 'WebNavigation',
        checked: false
      }, {
        value: 'webRequest',
        name: 'WebRequest',
        checked: false
      }, {
        value: 'webRequestBlocking',
        name: 'WebRequestBlocking',
        checked: false
      }]
    }];

    this.prompt(prompts, function(answers) {

      var isChecked = function(choices, value) {
        return choices.indexOf(value) > -1;
      };

      // Meta
      this.appname = this.manifest.name = answers.name.replace(/\"/g, '\\"');
      this.appShortName = this.manifest.shortName = answers.shortName.replace(/\"/g, '\\"');
      this.manifest.description = answers.description.replace(/\"/g, '\\"');

      // UI Actions
      this.manifest.action = (answers.action === 'No') ? 0 : (answers.action === 'Browser') ? 1 : 2;

      // UI Features
      this.manifest.options = isChecked(answers.uifeatures, 'options');
      this.manifest.devtoolsPage = isChecked(answers.uifeatures, 'devtoolsPage');
      this.manifest.omnibox = isChecked(answers.uifeatures, 'omnibox');
      this.manifest.contentscript = isChecked(answers.uifeatures, 'contentscript');

      // Permissions
      this.manifest.permissions.alarms = isChecked(answers.permissions, 'alarms');
      this.manifest.permissions.bookmarks = isChecked(answers.permissions, 'bookmarks');
      this.manifest.permissions.browsingData = isChecked(answers.permissions, 'browsingData');
      this.manifest.permissions.clipboardRead = isChecked(answers.permissions, 'clipboardRead');
      this.manifest.permissions.clipboardWrite = isChecked(answers.permissions, 'clipboardWrite');
      this.manifest.permissions.commands = isChecked(answers.permissions, 'commands');
      this.manifest.permissions.contentSettings = isChecked(answers.permissions, 'contentSettings');
      this.manifest.permissions.contextMenus = isChecked(answers.permissions, 'contextMenus');
      this.manifest.permissions.cookies = isChecked(answers.permissions, 'cookies');
      this.manifest.permissions.debugger = isChecked(answers.permissions, 'debugger');
      this.manifest.permissions.declarativeContent = isChecked(answers.permissions, 'declarativeContent');
      this.manifest.permissions.desktopCapture = isChecked(answers.permissions, 'desktopCapture');
      this.manifest.permissions.downloads = isChecked(answers.permissions, 'downloads');
      this.manifest.permissions['enterprise.platformKeys'] = isChecked(answers.permissions, 'enterprise.platformKeys');
      this.manifest.permissions.fontSettings = isChecked(answers.permissions, 'fontSettings');
      this.manifest.permissions.gcm = isChecked(answers.permissions, 'gcm');
      this.manifest.permissions.history = isChecked(answers.permissions, 'history');
      this.manifest.permissions.identity = isChecked(answers.permissions, 'identity');
      this.manifest.permissions.idle = isChecked(answers.permissions, 'idle');
      this.manifest.permissions.input = isChecked(answers.permissions, 'input');
      this.manifest.permissions.management = isChecked(answers.permissions, 'management');
      this.manifest.permissions.notifications = isChecked(answers.permissions, 'notifications');
      this.manifest.permissions.pageCapture = isChecked(answers.permissions, 'pageCapture');
      this.manifest.permissions.proxy = isChecked(answers.permissions, 'proxy');
      this.manifest.permissions.pushMessaging = isChecked(answers.permissions, 'pushMessaging');
      this.manifest.permissions['system.cpu'] = isChecked(answers.permissions, 'system.cpu');
      this.manifest.permissions['system.memory'] = isChecked(answers.permissions, 'system.memory');
      this.manifest.permissions['system.storage'] = isChecked(answers.permissions, 'system.storage');
      this.manifest.permissions.tabCapture = isChecked(answers.permissions, 'tabCapture');
      this.manifest.permissions.tabs = isChecked(answers.permissions, 'tabs');
      this.manifest.permissions.topSites = isChecked(answers.permissions, 'topSites');
      this.manifest.permissions.tts = isChecked(answers.permissions, 'tts');
      this.manifest.permissions.ttsEngine = isChecked(answers.permissions, 'ttsEngine');
      this.manifest.permissions.webNavigation = isChecked(answers.permissions, 'webNavigation');
      this.manifest.permissions.webRequest = isChecked(answers.permissions, 'webRequest');
      this.manifest.permissions.webRequestBlocking = isChecked(answers.permissions, 'webRequestBlocking');

      // Override a chrome page
      switch (answers.overridePage) {
        case 'Bookmarks Page':
          this.manifest.overridePage = true;
          this.manifest.bookmarksPage = true;
          break;
        case 'History Page':
          this.manifest.overridePage = true;
          this.manifest.historyPage = true;
          break;
        case 'Newtab Page':
          this.manifest.overridePage = true;
          this.manifest.newtabPage = true;
          break;
        case 'No':
          this.manifest.overridePage = false;
          break;
      }

      cb();
    }.bind(this));
  },

  writing: {

    app: function() {
      this.mkdir('app');
    },

    gulpfile: function() {
      this.template('gulpfile.babel.js', 'gulpfile.babel.js');

      this.copy('tasks/clean.js', 'tasks/clean.js');
      this.copy('tasks/compress.js', 'tasks/compress.js');
      this.copy('tasks/default.js', 'tasks/default.js');
      this.copy('tasks/fonts.js', 'tasks/fonts.js');
      this.copy('tasks/images.js', 'tasks/images.js');
      this.copy('tasks/livereload.js', 'tasks/livereload.js');
      this.copy('tasks/locales.js', 'tasks/locales.js');
      this.copy('tasks/manifest.js', 'tasks/manifest.js');
      this.copy('tasks/pages.js', 'tasks/pages.js');
      this.copy('tasks/scripts.js', 'tasks/scripts.js');
      this.copy('tasks/styles.js', 'tasks/styles.js');
      this.copy('tasks/version.js', 'tasks/version.js');

    },

    packageJSON: function() {
      this.template('_package.json', 'package.json');
    },

    readme: function() {
      this.template('README.md', 'README.md');
    },

    git: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    eslint: function() {
      this.copy('eslintrc', '.eslintrc');
    },

    artworks: function() {
      this.mkdir('artworks');
      this.copy('artworks/Chrome-Webstore-Icon_128x128.png', 'artworks/Chrome-Webstore-Icon_128x128.png');
      this.copy('artworks/Promo-Image-Large_920x680.png', 'artworks/Promo-Image-Large_920x680.png');
      this.copy('artworks/Promo-Image-Marquee_1400x560.png', 'artworks/Promo-Image-Marquee_1400x560.png');
      this.copy('artworks/Promo-Image-Small_440x280.png', 'artworks/Promo-Image-Small_440x280.png');
      this.copy('artworks/Screenshot_1280x800.png', 'artworks/Screenshot_1280x800.png');
      this.copy('artworks/Screenshot_640x400.png', 'artworks/Screenshot_640x400.png');
    },

    editorConfig: function() {
      this.copy('editorconfig', '.editorconfig');
    },

    manifest: function() {
      var manifest = {};
      var permissions = [];
      var items = [];

      function buildJSONPart(part) {
        return JSON.stringify(part, null, 2).replace(/\n/g, '\n  ');
      }

      // add browser / page action field
      if (this.manifest.action > 0) {
        var action = {
          default_icon: {
            19: 'images/icon-19.png',
            38: 'images/icon-38.png'
          },
          default_title: this.manifest.name,
          default_popup: 'pages/popup.html'
        };
        var title = (this.manifest.action === 1) ? 'browser_action' : 'page_action';
        manifest[title] = buildJSONPart(action);
      }

      // add options page field.
      if (this.manifest.options) {
        manifest.options_page = '"pages/options.html"';
        manifest.options_ui = buildJSONPart({
          "page": "pages/options.html",
          "chrome_style": true
        });
      }

      // add devtool page field.
      if (this.manifest.devtoolsPage) {
        manifest.minimum_chrome_version = '"10.0"';
        manifest.devtools_page = '"pages/devtools.html"';
      }

      // Override Pages
      if (this.manifest.overridePage) {

        // add history page field.
        if (this.manifest.historyPage) {
          manifest.chrome_url_overrides = buildJSONPart({
            history: 'pages/history.html'
          });
        }

        // add bookmarks page field.
        if (this.manifest.bookmarksPage) {
          manifest.chrome_url_overrides = buildJSONPart({
            bookmarks: 'pages/bookmarks.html'
          });
        }

        // add newtab page field.
        if (this.manifest.newtabPage) {
          manifest.chrome_url_overrides = buildJSONPart({
            newtab: 'pages/newtab.html'
          });
        }

      }

      // add omnibox keyword field.
      if (this.manifest.omnibox) {
        manifest.omnibox = buildJSONPart({
          keyword: this.manifest.shortName
        });
      }

      // add contentscript field.
      if (this.manifest.contentscript) {
        var contentscript = [{
          matches: ['http://*/*', 'https://*/*'],
          css: ['styles/contentscript.css'],
          js: ['scripts/contentscript.js'],
          run_at: 'document_end',
          all_frames: false
        }];

        manifest.content_scripts = buildJSONPart(contentscript);
      }

      // add generate permission field.
      for (var p in this.manifest.permissions) {
        if (this.manifest.permissions[p]) {
          permissions.push(p);
        }
      }

      // add generic match pattern field.
      if (this.manifest.permissions.tabs) {
        permissions.push('http://*/*');
        permissions.push('https://*/*');
      }

      // add permissions
      if (permissions.length > 0) {
        manifest.permissions = buildJSONPart(permissions);
      }

      for (var i in manifest) {
        items.push(['  "', i, '": ', manifest[i]].join(''));
      }

      this.manifest.items = (items.length > 0) ? ',\n' + items.join(',\n') : '';

      this.template('app/manifest.json', 'app/manifest.json');
    },

    actions: function() {
      if (this.manifest.action === 0) {
        return;
      }

      this.copy('app/pages/popup.html', 'app/pages/popup.html');
      this.copy('app/scripts/popup.js', 'app/scripts/popup.js');
      this.copy('app/styles/popup.less', 'app/styles/popup.less');
      this.copy('app/images/icon-19.png', 'app/images/icon-19.png');
      this.copy('app/images/icon-38.png', 'app/images/icon-38.png');
    },

    eventpage: function() {
      var backgroundjs = 'background.js';

      if (this.manifest.action === 2) {
        backgroundjs = 'background.pageaction.js';
      } else if (this.manifest.action === 1) {
        backgroundjs = 'background.browseraction.js';
      }

      this.copy('app/scripts/' + backgroundjs, 'app/scripts/background.js');
      this.copy('app/scripts/lib/chromereload.js', 'app/scripts/lib/chromereload.js');
      this.copy('app/scripts/lib/livereload.js', 'app/scripts/lib/livereload.js');
    },

    options: function() {
      if (!this.manifest.options) {
        return;
      }

      this.copy('app/pages/options.html', 'app/pages/options.html');
      this.copy('app/scripts/options.js', 'app/scripts/options.js');
      this.copy('app/styles/options.less', 'app/styles/options.less');
    },

    devtools: function() {
      if (!this.manifest.devtoolsPage) {
        return;
      }

      this.copy('app/pages/devtools.html', 'app/pages/devtools.html');
      this.copy('app/scripts/devtools.js', 'app/scripts/devtools.js');
      this.copy('app/styles/devtools.less', 'app/styles/devtools.less');
    },

    history: function() {
      if (!this.manifest.historyPage) {
        return;
      }

      this.copy('app/pages/history.html', 'app/pages/history.html');
      this.copy('app/scripts/history.js', 'app/scripts/history.js');
      this.copy('app/styles/history.less', 'app/styles/history.less');
    },

    bookmarks: function() {
      if (!this.manifest.bookmarksPage) {
        return;
      }

      this.copy('app/pages/bookmarks.html', 'app/pages/bookmarks.html');
      this.copy('app/scripts/bookmarks.js', 'app/scripts/bookmarks.js');
      this.copy('app/styles/bookmarks.less', 'app/styles/bookmarks.less');
    },

    newtab: function() {
      if (!this.manifest.newtabPage) {
        return;
      }

      this.copy('app/pages/newtab.html', 'app/pages/newtab.html');
      this.copy('app/scripts/newtab.js', 'app/scripts/newtab.js');
      this.copy('app/styles/newtab.less', 'app/styles/newtab.less');
    },

    contentscript: function() {
      if (!this.manifest.contentscript) {
        return;
      }

      this.copy('app/scripts/contentscript.js', 'app/scripts/contentscript.js');
      this.copy('app/styles/contentscript.less', 'app/styles/contentscript.less');
    },

    assets: function() {
      this.template('app/_locales/en/messages.json', 'app/_locales/en/messages.json');
      this.copy('app/images/icon-16.png', 'app/images/icon-16.png');
      this.copy('app/images/icon-128.png', 'app/images/icon-128.png');
      this.copy('app/images/icon-large.svg', 'app/images/icon-large.svg');
      this.copy('app/fonts/gitkeep', 'app/fonts/.gitkeep');
    }
  },

  install: function() {
    var self = this;
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install'],
      callback: function() {
        self.log(yosay('Please run ' + chalk.red('gulp') + ' or  ' + chalk.yellow('gulp --watch') + ' and load the generated dist into chrome.'));
      }
    });
  }
});
