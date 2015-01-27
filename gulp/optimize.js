'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var ngFS = require('gulp-angular-filesort');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('optimize', ['clean', 'inject'], function() {
 var assets = $.useref.assets({searchPath: './'});
    // Filters are named for the gulp-useref path
    var cssFilter   = $.filter('**/*.css');
    var jsAppFilter = $.filter('**/' + config.optimized.app);
    var jslibFilter = $.filter('**/' + config.optimized.lib);

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache),
            {name: 'inject:templates', read: false}))
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe($.size())
        .pipe(cssFilter.restore())
        // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate({add: true}))
        .pipe(ngFS())
        .pipe($.uglify())
        .pipe($.size())
        .pipe($.sourcemaps.write('./'))
        .pipe(jsAppFilter.restore())
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.sourcemaps.init())
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe($.size())
        .pipe($.sourcemaps.write('./'))
        .pipe(jslibFilter.restore())
        // Take inventory of the file names for future rev numbers
        .pipe($.rev())
        // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe($.useref())
        // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build));
});
