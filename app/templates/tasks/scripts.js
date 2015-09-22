import gulp from 'gulp';
import gulpif from 'gulp-if';
import named from 'vinyl-named';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

gulp.task('scripts', (cb) => {
  return gulp.src('app/scripts/*.js')
    .pipe(named())
    .pipe(gulpWebpack({
      devtool: production ? null : 'source-map',
      watch: watch,
      plugins: [
        new webpack.DefinePlugin({
          'ENV': JSON.stringify(production ? 'production' : 'development')
        }),
      ].concat(production ? [
        new webpack.optimize.UglifyJsPlugin()
      ] : []),
      module: {
        preLoaders: [{
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }],
        loaders: [{
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/
        }]
      },
      eslint: {
        configFile: '.eslintrc'
      }
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulpif(watch, livereload()));
});
