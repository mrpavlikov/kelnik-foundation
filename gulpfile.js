/**
 * Usage
 *
 * Build project:
 * $ gulp
 * or
 * $ gulp build
 *
 * Watch for sass changes
 * $ gulp watch
 */
var projectName  = 'kelnik-foundation';

var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var handlebars   = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var compass      = require('gulp-compass');
var scsslint     = require('gulp-scss-lint');
var jscs         = require('gulp-jscs');
var map          = require('map-stream');
var chmod        = require('gulp-chmod');
var notify       = require('gulp-notify');
var tap          = require('gulp-tap');
var Notification = require('node-notifier');
var notifier     = new Notification();

/**
 * Error function for plumber
 * @param  {Object} error
 */
var onError = notify.onError('Ошибка в <%= error.plugin %>');

/**
 * Configuring paths
 * @type {Object}
 */
var paths = {
    scripts   : ['dist/js/**/*.js'],
    sass      : ['dist/styles/**/*.scss'],
    templates : ['dist/js/tpl/**/*.hbs']
};

/**
 * Build tasks
 */

// Main build task
gulp.task('build', [
    'hooks',
    'compass',
    'vendor',
    'js-uglify',
    'templates'
]);

gulp.task('compass', function() {
    'use strict';

    return gulp.src(paths.sass)
        .pipe(compass({
            css         : 'www/css',
            sass        : 'dist/styles',
            config_file : './config.rb' // jshint ignore:line
        }))
        .on('error', notify.onError({
            message : 'Failed to compile',
            title   : projectName + ': compass'
        }))
        .on('error', function() {
            this.emit('end');
        });
});

gulp.task('js-uglify', function jsTask() {
    'use strict';

    var errorTpl = [
        'Line: <%= error.lineNumber %>: <%= error.message %>',
        '<%= error.fileName %>'
    ].join('\n') ;

    var titleTpl = projectName + ': <%= error.plugin %>';

    return gulp.src(paths.scripts, {
        base: 'dist/js'
    })
        .pipe(plumber({
            errorHandler: notify.onError({
                message : errorTpl,
                title   : titleTpl
            })
        }))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('www/js'));
});

gulp.task('vendor', function vendorTask() {
    'use strict';

    return gulp.src(['www/js/lib/requirejs/require.js'], {
        base: process.cwd() // jshint ignore:line
    })
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('.'));
});

gulp.task('templates', function templatesTask() {
    'use strict';

    var fileName;
    var errorTpl = '<%= error.message %>';

    return gulp.src(paths.templates)
        .pipe(tap(function(file) {
            fileName = file.relative;
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                message : function() {
                    return errorTpl + '\n\n' + fileName;
                },
                title   : projectName + ': handlebars'
            })
        }))
        .pipe(handlebars())
        .pipe(plumber.stop())
        .pipe(defineModule('amd'))
        .pipe(uglify({
            outSourceMap : false
        }))
        .pipe(gulp.dest('www/js/tpl/'));
});

/**
 * Lint tasks
 */

// Main lint task
gulp.task('lint', ['jscs', 'jshint', 'scss-lint']);

gulp.task('scss-lint', function sassLintTask() {
    'use strict';

    return gulp.src(paths.sass)
        .pipe(scsslint({
            config : '.scss-lint.yml'
        }))
        .pipe(scsslint.failReporter());
});

gulp.task('jshint', function lintTask() {
    'use strict';

    var errorReporter = function() {
        return map(function(file, cb) {
            if (!file.jshint.success) {
                process.exit(1); // jshint ignore:line
            }
            cb(null, file);
        });
    };

    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(errorReporter());
});

gulp.task('jscs', function jscsTask() {
    'use strict';
    return gulp.src(paths.scripts)
        .pipe(jscs());
});

/**
 * Hook tasks
 */

gulp.task('hooks', function() {
    'use strict';

    gulp.src('hooks/*')
        .pipe(chmod({
            execute: true
        }))
        .pipe(gulp.dest('.git/hooks/'));
});

/**
 * Notify tasks
 */
gulp.task('pre-commit-notify', function() {
    'use strict';
    notifier.notify({
        message : 'Commit failed. Fix errors first.',
        title   : projectName
    });
});

/**
 * Watch task
 */
gulp.task('watch', ['build'], function watch() {
    'use strict';

    gulp.watch(paths.sass     , ['compass']);
    gulp.watch(paths.scripts  , ['js-uglify']);
    gulp.watch(paths.templates, ['templates']);
});

// Run
gulp.task('default', ['build']);
