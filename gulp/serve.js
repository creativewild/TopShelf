'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync'),
    config       = require('../gulp.config')(),
    path         = require('path'),
    _            = require('lodash'),
    $            = require('gulp-load-plugins')({lazy: true});

// watch files for changes and reload
gulp.task('serve', ['clean:sass', 'styles', 'nodemon'], function() {
  browserSync({
    proxy: 'http://localhost:9000',
    files: [
        config.client + '**/*',
        config.temp + '**/*.css',
        '!' + config.sass
    ],
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true,
    reloadDelay: 0 //1000
  });

  gulp.watch([config.sass], ['styles']);
});