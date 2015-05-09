var   gulp       = require('gulp')
	, gutil      = require('gulp-util')
	, jshint     = require('gulp-jshint')
	, uglify     = require('gulp-uglify')
	, concat     = require('gulp-concat')
	, sourcemaps = require('gulp-sourcemaps')

	, input      = { 'javascript': ['js/helpList.js', 'js/terminal.js', 'js/funcs.js', 'js/checkCommand.js', 'js/tutorial.js', 'js/app.js'] } // 'js/**/*.js' would cover all js folders and files
	, output     = { 'javascript': 'production/js/' };

// set default task when gulp is called without arguments
gulp.task('default', ['watch']);

// run javascript through jshint
gulp.task('jshint', function () {
	return gulp.src(input.javascript)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// concat javascript files, minify if --type production
gulp.task('build-js', function (){
	return gulp.src(input.javascript)
		.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			// only uglify if gulp is ran with '--type production'
			.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output.javascript));
});

// watch files for changes and run the task on update
gulp.task('watch', function () {
	gulp.watch(input.javascript, ['jshint', 'build-js']);
});

