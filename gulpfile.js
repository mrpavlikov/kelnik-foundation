var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
// var concat = require('gulp-concat');
// var rebaseUrls = require('gulp-css-rebase-urls');

var onError = function (err) {
	console.error('Error in plugin ' + err.plugin + "\n" +
		"Message: " + err.message);
};

var paths = {
	scripts: ['src/js/*.js'],
	sass: ['src/scss/*.scss'],
};

// Compile Sass
gulp.task('sass', function() {
	gulp.src(paths.sass)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			includePaths: ['scss', 'js/vendor/foundation/scss'],
			outputStyle: 'expanded'
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('css'))
	;
});

// Concat all css in one
gulp.task('css', ['sass'], function() {
	gulp.src(['css/*.css'])
		.pipe(plumber({
			errorHandler: onError
		}))
		// .pipe(rebaseUrls())
		// .pipe(concat('style.css'))
		.pipe(minifycss())
		.pipe(plumber.stop())
		.pipe(gulp.dest('css'))
	;
});

// Uglify js
gulp.task('js', function() {
	gulp.src(paths.scripts, {base: 'src/js'})
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(uglify({
			outSourceMap: false
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('js'))
	;

	gulp.src(['js/vendor/requirejs/require.js'], { base: process.cwd() })
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(uglify({
			outSourceMap: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('.'))
	;
});

// Watch
gulp.task('watch', ['css', 'js'], function(event) {
	gulp.watch(paths.sass, ['css']);
	gulp.watch(paths.scripts, ['js']);
});

// Run
gulp.task('default', ['watch']);
