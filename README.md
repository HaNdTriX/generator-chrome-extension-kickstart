![generator-chrome-extension-kickstart](images/chrome-extension-kickstarter-intro.png)

[![Build Status](https://secure.travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart.png?branch=master)](https://travis-ci.org/HaNdTriX/generator-chrome-extension-kickstart) [![npm package](https://badge.fury.io/js/generator-chrome-extension-kickstart.svg)](https://www.npmjs.com/package/generator-chrome-extension-kickstart)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square)](https://github.com/feross/standard)

Advanced WebExtension generator that creates everything you need to get started with extension development. 

This generator uses:

* [gulp.js](http://gulpjs.com/)
* [webpack](http://webpack.github.io/docs/)
* [Babel.js](https://babeljs.io/)

## Features

* ES2015
* Modules (ES2015, CommonJS, AMD)
* Multi browser support ([chrome](https://developer.chrome.com/extensions), [firefox](https://wiki.mozilla.org/WebExtensions), [opera](https://dev.opera.com/extensions/), [edge](https://docs.microsoft.com/en-us/microsoft-edge/extensions))
* Vendor prefixed manifest keys
* Sourcemaps
* Linting
* CSS, Sass, Less
* Environment variables
* Image optimization
* Livereload
* Packaging
* Version management

## Install

	$ npm install -g yo generator-chrome-extension-kickstart

## Getting Started

- First make a new directory, and `cd` into it: `mkdir my-new-chrome-extension && cd $_`
- Run: `yo chrome-extension-kickstart`.

## Options

* `--skip-install`

  Skips the automatic execution of `npm` after
  scaffolding has finished.
  
## Documentation

Check out the [documentation](DOCUMENTATION.md)

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

## License

[MIT](LICENSE)
