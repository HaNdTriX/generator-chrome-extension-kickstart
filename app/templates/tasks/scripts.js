import gulp from 'gulp';
import gulpif from 'gulp-if';
import named from 'vinyl-named';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('scripts', (cb) => {
  return gulp.src('app/scripts/*.js')
    .pipe(named())
    .pipe(gulpWebpack({
      devtool: args.sourcemaps ? 'source-map': null,
      watch: args.watch,
      plugins: [
        new webpack.DefinePlugin({
          '__ENV__': JSON.stringify(args.production ? 'production' : 'development'),
          '__VENDOR__': JSON.stringify(args.vendor)
        }),
      ].concat(args.production ? [
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
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
    .pipe(gulpif(args.watch, livereload()));
});

