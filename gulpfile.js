// Project Specific Variables
const projectPath 		= './';
const devPath 			= projectPath + '_dev';
const buildPath 		= projectPath + 'assets';
const projectURL 		= 'http://local.universe';

// Global Gulp Dependency
const gulp 				= require('gulp');
const gulpLoadPlugins 	= require('gulp-load-plugins');
const rename			= require('gulp-rename');
const newer				= require('gulp-newer');
const path 				= require('path');
const webpack 			= require('webpack-stream');

// Styles Task Dependencies
const sass 				= require('gulp-sass');
const pixrem 			= require('gulp-pixrem');
const autoprefixer		= require('gulp-autoprefixer');
const cleanCSS 			= require('gulp-clean-css');

// Scripts Task Dependencies
const concat 			= require('gulp-concat');
const uglify			= require('gulp-uglify');


// Images Task Dependencies
const imagemin			= require('gulp-imagemin');
const pngquant			= require('imagemin-pngquant');

// SVG Task Dependencies
const svgstore			= require('gulp-svgstore');
const svgmin			= require('gulp-svgmin');
const cheerio 			= require('gulp-cheerio');

const $ = gulpLoadPlugins();

// Server Task Dependencies
const browserSync		= require('browser-sync').create();
const reload = browserSync.reload;


// CSS
gulp.task('styles', function() {
	gulp.src([devPath + '/scss/compile.scss'])
		.pipe(rename({ basename: "main" }))
		.pipe(sass().on('error', sass.logError))
		.pipe(pixrem({ rootValue: '62.5%' }))
		.pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 8', 'ie 9'] }))
		//.pipe(gulp.dest(buildPath + '/css/'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(buildPath + '/css/'))
});


gulp.task('scripts', function() {
  return gulp.src([devPath + '/js/main.js'])
    .pipe(webpack({
      output: {
        filename: 'main.js'
      }
    }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/js/'))
    .pipe(reload({stream: true}));
});

// Images
gulp.task('images', function() {
	gulp.src([devPath + '/images/**/*.{png,jpg,gif,ico,svg}'])
		.pipe(newer(buildPath + '/images/'))
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest(buildPath + '/images/'))
});

// SVGs
gulp.task('svg', function() {
	gulp.src([devPath + '/images/svgs/*.svg'])
		.pipe(svgmin(function(file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + 'shape-',
						minify: true,
					}
				}]
			}
		}))
		.pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
		.pipe(rename({prefix: 'shape-'}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(gulp.dest(projectPath + '/_includes'))
});

// Watch
gulp.task('watch', function() {
	gulp.watch(devPath + '/scss/**/*.scss', ['styles']);
	gulp.watch(devPath + '/js/modules/*.js', ['scripts']);
});

// gulp.task('server', function() {
// 	browserSync.init({
// 		open: false,
// 		injectChanges: true,
// 		files: [buildPath + '/css/*.css', buildPath + '/js/*.js']
// 	})
// 	gulp.watch(projectPath + '**/*.html').on('change', browserSync.reload);
// });
// http://127.0.0.1:4000/

gulp.task('serve', function () {
    browserSync.init({
		open: false,
		server: {baseDir: '_site/'},
		injectChanges: true,
	});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Default Gulp task, run by calling 'gulp' in CLI
gulp.task('default', ['styles', 'scripts', 'svg', 'images', 'watch', 'serve'])
