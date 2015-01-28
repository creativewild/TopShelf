'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {

    return gulp
      .src(config.js)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
     // .pipe($.jshint.reporter('fail'))
      .pipe($.jscs());
});

gulp.task('vet:nofail', function () {

    return gulp
      .src(config.js)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jscs());
});

// generate a todo.md from your javascript files
gulp.task('todo', function() {
    gulp.src(config.js)
        .pipe($.todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos
});
