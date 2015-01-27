'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var ngFS = require('gulp-angular-filesort');
var path = require('path');
var _ = require('lodash');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', ['clean', 'optimize', 'images', 'fonts'], function() {
    del(config.temp);
});
