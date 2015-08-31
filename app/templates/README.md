# <%= manifest.name %>

<%= manifest.description %>

## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

	$ gulp


| Option         | Description                                                                                                                                       |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. To reload the extension on change include `chromereload.js` or `livereload.js` in your bundle. |
| `--production` | Minifies all assets                                                                                                                               |
| `--verbose`    | Log additional data to the console.            


### compress

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp compress

### Version

Increments version number of `manifest.json` and `package.json`, 
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X
 
or 

    $ gulp feature    // => 0.X.0

or 

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

	if(ENV === 'development'){
		console.log('We are in development mode!');
	}

	





