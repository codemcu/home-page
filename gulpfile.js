var gulp        = require('gulp'),
	del         = require('del'),
	browserSync = require('browser-sync').create(),
	$ 			= require('gulp-load-plugins')({lazy: true});

//directorios origen
var srcPaths = {
	images:   'src/img/',
	scripts:  'src/js/',
	styles:   'src/sass/',
	files:    'src/'
};


//directorios destino
var distPaths = {
	images:   'dist/img/',
	scripts:  'dist/js/',
	styles:   'dist/css/',
	files:    './'
};

//limpieza de dist
gulp.task('clean', function(cb) {
	del([ distPaths.files + 'index.html', 
		distPaths.scripts + 'main.min.js', 
		distPaths.styles + 'style.css'], cb);
});


//copia de html en dist.
gulp.task('html', function() {
	return gulp.src([srcPaths.files + '*.html'])
		.pipe(gulp.dest(distPaths.files))
		.pipe(browserSync.stream());
});


//procesamiento de SCSS
gulp.task('css', function() {
	return gulp.src([srcPaths.styles + '**/*.scss'])
			.pipe($.sourcemaps.init())
			.pipe($.sass(
				{outputStyle: 'compressed'}
			))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(distPaths.styles))
			.pipe(browserSync.stream());
});

//procesamiento de JS (errores)
gulp.task('lint', function() {
	return gulp.src([srcPaths.scripts + '**/main.js'])
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish', {
				verbose: true
			}));
});


//creacion de JS minificado
gulp.task('js', ['lint'], function() {
	return gulp.src([srcPaths.scripts + 'main.js'])
		.pipe($.sourcemaps.init())
		.pipe($.rename('main.min.js'))
		.pipe($.uglify())
		.pipe($.sourcemaps.write('maps'))
		.pipe(gulp.dest(distPaths.scripts))
		.pipe(browserSync.stream());
});



gulp.task('serve', ['html', 'css', 'js'], function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
		// logLevel: "info",
		// browser: ["google chrome"],
		// proxy: "localhost:80",
		// startPath: "/UOC/Desarrollo_Frontend_Framework_Javascript/PEC01/it_excusegenerator/dist/"
	});

	gulp.watch(srcPaths.files + '*.html', ['html']);
	gulp.watch(srcPaths.styles + '**/*.scss', ['css']);
	gulp.watch(srcPaths.scripts + '**/*.js', ['js']);
});


gulp.task('default', ['clean', 'serve'], function() {});