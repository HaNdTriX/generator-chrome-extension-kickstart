import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import glob from 'glob';
import _ from 'lodash';
import webpack from 'webpack';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;
let verbose = !!argv.verbose;

let appDir = path.resolve(__dirname, '../app');

function globToEntryMap(...args) {
  var files = glob.sync(...args)
  return _(files)
    .map(function(filePath) {
      var bundleName = path.basename(filePath, '.js');
      return [bundleName, `./${filePath}`];
    })
    .zipObject()
    .value();
}

function createWebpackConfig() {
  return {
    devtool: production ? null : 'inline-source-map',
    watch: watch,
    context: appDir,
    entry: globToEntryMap('scripts/*.js', {
      cwd: appDir
    }),
    output: {
      path: 'dist/scripts',
      filename: '[name].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(production ? 'production' : 'development')
      }),
    ].concat(production ? [
      new webpack.optimize.UglifyJsPlugin()
    ] : []),
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }],
      preLoaders: [{
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }]
    },
    eslint: {
      configFile: '.eslintrc'
    }
  };
};

gulp.task('scripts', (cb) => {
  let styledName = gutil.colors.cyan(`'webpack'`);
  gutil.log('Starting', styledName);
  webpack(createWebpackConfig(), (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('Finished', styledName + ':\n', stats.toString({
      colors: true,
      reasons: verbose,
      hash: verbose,
      version: verbose,
      timings: verbose,
      chunks: verbose,
      chunkModules: verbose,
      cached: verbose,
      cachedAssets: verbose,
      children: verbose
    }));

    if (watch) {
      livereload.reload()
    } else {
      cb();
    }

  });
});
