var gulp         = require('gulp');
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var handlebars   = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

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

var paths = {
    scripts  : ['dist/js/*.js'],
    sass     : ['dist/scss/*.scss'],
    templates: ['dist/templates/*.hbs']
};


// Compile Sass
gulp.task('sass', function sassTask() {
    'use strict';

    return gulp.src(paths.sass)
        .pipe(sass({
            includePaths: ['scss', 'www/js/vendor/foundation/scss'],
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(gulp.dest('www/css'));
});



// Uglify js
gulp.task('js', ['lint'], function jsTask() {
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


// Uglify vendor scripts
gulp.task('vendor', function vendorTask() {
    'use strict';

    return gulp.src(['www/js/vendor/requirejs/require.js'], {
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


// Compile templates
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

// Jshint linting
gulp.task('lint', function lintTask() {
    'use strict';

    return gulp.src(paths.scripts)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(plumber.stop());
});

// Watch
gulp.task('watch', function watch() {
    'use strict';

    gulp.watch(paths.sass     , ['sass']);
    gulp.watch(paths.scripts  , ['js']);
    gulp.watch(paths.templates, ['templates']);
});


// Run
gulp.task('default', [
    'sass',
    'vendor',
    'js',
    'templates',
    'watch'
]);

