# generator-chrome-extension-kickstart [![Build Status](https://secure.travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart.png?branch=master)](https://travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart)

Chrome Extension generator that creates everything you need to get started with extension development. 
This generator uses [gulp.js](http://gulpjs.com/) and [webpack](http://webpack.github.io/docs/).


## Warning

This generator is still in active development and things will change!
So use it at your own risk!

## Install

	$ npm install -g yo generator-chrome-extension-kickstart

## Getting Started

- First make a new directory, and `cd` into it: `mkdir my-new-chrome-extension && cd $_`
- Run: `yo chrome-extension-kickstart`.

## Options

* `--skip-install`

  Skips the automatic execution of `npm` after
  scaffolding has finished.
  
## Chrome API Support

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

  
## Test Chrome Extension

To test, go to: `chrome://extensions`, enable Developer mode and load `dist` as an unpacked extension.

## Tasks

### Build

  $ gulp

| Option         | Description                                                                                                                                       |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. To reload the extension on change include `chromereload.js` or `livereload.js` in your bundle. |
| `--production` | Minifies all assets                                                                                                                               |
| `--verbose`    | Log additional data to the console.            

for more tasks please check out the tasks directory.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
