# generator-chrome-extension-kickstart [![Build Status](https://secure.travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart.png?branch=master)](https://travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart) [![npm package](https://badge.fury.io/js/generator-chrome-extension-kickstart.svg)](https://www.npmjs.com/package/generator-chrome-extension-kickstart)

Chrome Extension generator that creates everything you need to get started with extension development. 

This generator uses:

* [gulp.js](http://gulpjs.com/)
* [webpack](http://webpack.github.io/docs/)
* [Babel](https://babeljs.io/)

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
  
## Test Chrome Extension

To test, go to: `chrome://extensions`, enable Developer mode and load `dist` as an unpacked extension.

## Tasks

### Build

    $ gulp

| Option         | Description                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include  `livereload.js` in your bundle. |
| `--production` | Minifies all assets                                                                                                               |
| `--verbose`    | Log additional data to the console.                                                                                               |          

for more tasks please check out the tasks directory.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
