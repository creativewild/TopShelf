'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    config       = require('../gulp.config')(),
    path         = require('path'),
    chalk  = require('chalk'),
    autoprefixer = require('autoprefixer-core'),
    _            = require('lodash'),
    $            = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', ['clean:sass'], function () {

  return gulp.src(config.sass)
    .pipe($.plumber())
    .pipe($.sass({
      sourceMap: 'sass',
      outputStyle: 'nested'
    }))
    .pipe($.postcss([autoprefixer({browsers: ['last 2 version']})]))
    .on('error', function handleError(err) {
          console.error(err.toString());
          this.emit('end');
      })
    .pipe(gulp.dest(config.temp));
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles'], function() {
      gulp.src('client/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe(gulp.dest(config.temp));
    });
});


/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '') +
    chalk.yellow(' > ' + msg) +
    (options.padding ? '\n' : '')
  );
}
