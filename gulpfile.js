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

/**
 * Error function for plumber
 * @param  {Object} err
 */
var onError = function(err) {
    'use strict';

    console.error(
        'Error in plugin ' + err.plugin + '\n' +
        'Message: ' + err.message
    );
};

/**
 * Configuring paths
 * @type {Object}
 */
var paths = {
    scripts   : ['dist/js/*.js'],
    sass      : ['dist/scss/*.scss'],
    templates : ['dist/templates/**/*.hbs']
};

/**
 * Build tasks
 */

// Main build task
gulp.task('build', [
    'hooks',
    'compass',
    'vendor',
    'js',
    'templates'
]);

gulp.task('compass', function() {
    'use strict';

    return gulp.src(paths.sass)
        .pipe(compass({
            css        : 'www/css',
            sass       : 'dist/scss',
            font       : 'www/fonts',
            import_path: 'www/js/foundation/scss', // jshint ignore:line
            style      : 'compressed',
            comments   : false,
            relative   : true
        }))
        .on('error', function() {
            this.emit('end');
        });
});

gulp.task('js', function jsTask() {
    'use strict';

    return gulp.src(paths.scripts, {
        base: 'dist/js'
    })
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('www/js'));
});

gulp.task('vendor', function vendorTask() {
    'use strict';

    return gulp.src(['www/js/requirejs/require.js'], {
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

    return gulp.src(paths.templates)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(handlebars())
        .pipe(plumber.stop())
        .pipe(defineModule('amd'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest('www/js/templates/'));
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
            config: '.scss-lint.yml'
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

    gulp.src('hooks/pre-commit')
        .pipe(chmod({
            execute: true
        }))
        .pipe(gulp.dest('.git/hooks/'));
});

/**
 * Watch task
 */
gulp.task('watch', ['build'], function watch() {
    'use strict';

    gulp.watch(paths.sass     , ['compass']);
    gulp.watch(paths.scripts  , ['js']);
    gulp.watch(paths.templates, ['templates']);
});

// Run
gulp.task('default', ['build']);
