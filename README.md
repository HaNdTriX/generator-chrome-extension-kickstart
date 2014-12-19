# generator-chrome-extension-kickstart [![Build Status](https://secure.travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart.png?branch=master)](https://travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart)

Chrome Extension generator that creates everything you need to get started with extension development. 
This generator uses [gulp.js](http://gulpjs.com/) and [browserify](http://browserify.org/).

## Install

	$ npm install -g yo generator-chrome-extension-kickstart

## Getting Started

- First make a new directory, and `cd` into it: `mkdir my-new-chrome-extension && cd $_`
- Run: `yo chrome-extension`, optionally passing an extension name: yo chrome-extension

## Options

* Browser UI:
  * [Browser Action](https://developer.chrome.com/extensions/browserAction)
  * [Page Action](https://developer.chrome.com/extensions/pageAction)
  * [Omnibox](https://developer.chrome.com/extensions/omnibox)
* Override Chrome Page
  * [Bookmarks Page](https://developer.chrome.com/extensions/override)
  * [History Page](https://developer.chrome.com/extensions/override)
  * [Newtab Page](https://developer.chrome.com/extensions/override)
* UI Features
  * [Options Page](https://developer.chrome.com/extensions/options)
  * [Devtools Page](https://developer.chrome.com/extensions/devtools)
  * [Content Scripts](https://developer.chrome.com/extensions/content_scripts)
  * [Omnibox](https://developer.chrome.com/extensions/omnibox)
* Permissions
  * [Bookmarks](https://developer.chrome.com/extensions/bookmarks)
  * ClipboardRead
  * ClipboardWrite
  * [ContentSettings](https://developer.chrome.com/extensions/contentSettings)
  * [ContextMenus](https://developer.chrome.com/extensions/contextMenus)
  * [Cookies](https://developer.chrome.com/extensions/cookies)
  * [Debugger](https://developer.chrome.com/extensions/debugger)
  * [History](https://developer.chrome.com/extensions/history)
  * [Idle](https://developer.chrome.com/extensions/idle)
  * [Management](https://developer.chrome.com/extensions/management)
  * [Notifications](https://developer.chrome.com/extensions/notifications)
  * [PageCapture](https://developer.chrome.com/extensions/pageCapture)
  * [Tabs](https://developer.chrome.com/extensions/tabs)
  * [TopSites](https://developer.chrome.com/extensions/topSites)
  * [WebNavigation](https://developer.chrome.com/extensions/webNavigation)
  * [WebRequest](https://developer.chrome.com/extensions/webRequest)
  * [WebRequestBlocking](https://developer.chrome.com/extensions/webRequest)
  * [Alarms](https://developer.chrome.com/extensions/alarms)
  * [BrowsingData](https://developer.chrome.com/extensions/browsingData)
  * [Commands](https://developer.chrome.com/extensions/commands)
  * [DeclarativeContent](https://developer.chrome.com/extensions/declarativeContent)
  * [DesktopCapture](https://developer.chrome.com/extensions/desktopCapture)
  * [Downloads](https://developer.chrome.com/extensions/downloads)
  * [Enterprise.platformKeys](https://developer.chrome.com/extensions/enterprise.platformKeys)
  * [fontSettings](https://developer.chrome.com/extensions/fontSettings)
  * [gcm](https://developer.chrome.com/extensions/gcm)
  * [Identity](https://developer.chrome.com/extensions/identity)
  * [Input](https://developer.chrome.com/extensions/input)
  * [Proxy](https://developer.chrome.com/extensions/proxy)
  * [PushMessaging](https://developer.chrome.com/extensions/pushMessaging)
  * [system.cpu](https://developer.chrome.com/extensions/system.cpu)
  * [system.memory](https://developer.chrome.com/extensions/system.memory)
  * [system.storage](https://developer.chrome.com/extensions/system.storage)
  * [TabCapture](https://developer.chrome.com/extensions/tabCapture)
  * [tts](https://developer.chrome.com/extensions/tts)


## App

Sets up a new Chrome Extension, generating all the boilerplate you need to get started.

    yo chrome-extension-kickstart

## Test Chrome Extension

To test, go to: `chrome://extensions`, enable Developer mode and load `dist` as an unpacked extension.


## Gulp tasks

To modify your tasks check out the `tasks` directory of your generated extension.

### Watch

Use for development.
Watches all files in the app directory and starts a fast build if a file was modified.
It uses sourcemaps and watchify.

	$ npm run watch


### Build

Use for production.

	$ npm run build


### Release

Increments the manifest version, builds the extension and packs it into a `.zip` file.

Use:

	$ npm run release
  

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.


## TODO

* Add tests

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
