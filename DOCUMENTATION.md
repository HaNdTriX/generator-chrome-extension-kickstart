# Documentation

## Directory Structure

    .
    ├── app                     # Source files
    ├──── _locales              # I18n files
    ├──── images                # Images files
    ├──── fonts                 # Font files
    ├──── pages                 # HTML files (Glob: `/*.html`)
    ├────── popup.html
    ├────── example.html
    ├──── scripts               # JS (ES2015) files (Glob: `/*.js`)
    ├────── background.js
    ├────── example.js
    ├──── styles                # CSS files (Glob: `/*.(css|less|css)`)
    ├────── popup.css
    ├────── example.less
    ├── dist                    # Compiled extensions
    ├──── chrome                
    ├──── firefox               
    ├──── opera                 
    ├── packages                # Packed extensions (.zip)
    ├── tasks                   # Build system files 
    ├──── lib
    ├──── build.js
    ├──── clean.js
    ├──── default.js
    ├──── images.js
    ├──── livereload.js
    ├──── locales.js
    ├──── manifest.js
    ├──── pack.js
    ├──── pages.js
    ├──── scripts.js            # webpack config
    ├──── styles.js             # css/less/sass config
    ├──── version.js
    └── README.md

## Gulp Tasks

### Flags

You can influence most predefined gulp tasks by adding flags to the gulp command:

| Flag           | Description                                                                                                                                                    |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                               |
| `--production` | Minifies all assets and sets the `__ENV__` variable to `production`                                                                                            |
| `--verbose`    | Log additional data to the console.                                                                                                                            |
| `--vendor`     | Compile the extension for different vendors (`chrome`, `firefox`, `opera`) and set the global `__VENDOR__` variable. <br>**Default:** `chrome`                 |
| `--sourcemaps` | Force the creation of sourcemaps. <br>**Default:** `!production`                                                                                               |

### Tasks

| Variable     | Description                                                                                                                      |
|--------------|----------------------------------------------------------------------------------------------------------------------------------|
| default      | alias for `build`                                                                                                                |
| `build`      | Runs `clean`,  `manifest`, `scripts`, `styles`, `pages`, `locales`, `images`, `fonts` and `livereload` task.                     |
| `clean`      | Deletes the `dist` directory.                                                                                                    |
| `style`      | Compiles css, scss and less files in the root of your `app/styles/*` directory.                                                  |
| `scripts`    | Compiles the scripts in the root of your `app/scripts/*` directory.                                                              |
| `pages`      | Compiles the html files in the pages directory.                                                                                  |
| `manifest`   | Compiles the `manifest.json` file and transforms vendor specific keys.                                                           |
| `locales`    | Copies the `_locales` into `dist`.                                                                                               |
| `fonts`      | Copies the `fonts` into dist.                                                                                                    |
| `livereload` | Starts a livereload server and watches all the assets. The `--watch` flag needs to be present in order for this task to work.    |
| `pack`       | Packs the dist directory into a zip file, adds version number and vendor to it and saves the bundle to the `packages` directory. |
| `patch`      | Bumbs the patch version in the `manifest.json`,  `package.json`, commits and adds a git tag.                                     |
| `feature`    | Bumbs the minor version in the `manifest.json`, `package.json`, commits and adds a git tag.                                      |
| `release`    | Bumbs the major version in the `manifest.json`, `package.json`, commits and adds a git tag.                                      |

**Example:**

Run a the development task:

    $ gulp build --watch --vendor=firefox

When you are done compile the extension for production:

	$ gulp build --production --vendor=firefox

and pack it for the webstore:

	$ gulp pack --vendor=firefox


## Working with multiple vendors

This generator supports the following vendors:

  * `chrome` <small>(default)</small>
  * `firefox`
  * `opera`

To build the extension for Firefox type:

    $ gulp build --vendor=firefox
  
This will generate a new directory under: `dist/firefox`.
If you want to pack this directory, simply type:

    $ gulp pack --vendor=firefox

into your Terminal. 
This will create a new archive in the `packages` directory.

### manifest.json

Sometimes every vendor needs its own attribute in the manifest file.
For example every vendor will have its own extension key.

Therefore the build tool supports vendor prefix keys in the `manifest.json` that will be converted to the orgional key in the build process.

**Example:** 

`app/manifest.json`

    {
       ...
       "__chrome__key": "chromeExtensionKey",
       "__opera__key": "operaExtensionKey",
       ...
    }
  
Running `$ gulp manifest --vendor=chrome` will create the following `manifest.json` file.

    {
       ...
       "key": "chromeExtensionKey",
       ...
    }


[source code](app/templates/tasks/lib/applyBrowserPrefixesFor.js)

### Predefined variables

This build tool also supports the following predefined variables. 

| Variable                | Description                              |
|-------------------------|------------------------------------------|
| `process.env.NODE_ENV`  | will be the same as the development flag |
| `__VENDOR__`            | will be the same as the vendor flag      |

Use them in your code via:

    if(__VENDOR__ === 'firefox'){
      // To something firefox specific
    }

The build tool will remove this code if the vendor is a diffrent one than firefox.

If your want to add your own predefined variables check out the [source code](app/templates/tasks/scripts.js).

### Polyfill vendor differences

An even better way to solve differences between browsers is to shim them via webpacks [provide plugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin)

More info regarding this topic is coming soon!

