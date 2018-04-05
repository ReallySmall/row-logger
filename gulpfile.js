const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
ts = require('gulp-typescript'),
webpack = require('webpack-stream'),
uiWebpackConfig = require('./webpack.ui.config.js');

const paths = {
	serverTs: {
		src: ['server/src/**/*.ts'],
		dist: 'server/dist'
	},
	uiTs: {
		src:'ui/ts/**/*.ts',
		dist: 'public/js'
	},
	sass: {
		src:'ui/scss/**/*.scss',
		dist: 'public/css'
	},
	svg: {
		src:'ui/img/**/*.svg',
		dist: 'public/img'
	}
}

gulp.task('serverTs', () => {

	return gulp.src(paths.serverTs.src)
		.pipe(plumber())
		.pipe(ts({
            noImplicitAny: false,
            rootDir: './server/src',
            lib: ['es6']
        }))	
        .pipe(gulp.dest(paths.serverTs.dist));

});

gulp.task('uiTs', () => {

	return gulp.src(paths.uiTs.src)
		.pipe(plumber())
		.pipe(webpack(uiWebpackConfig))
		.pipe(gulp.dest(paths.uiTs.dist));

});

gulp.task('sass', () => {

	return gulp.src(paths.sass.src)
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(paths.sass.dist));

});

gulp.task('buildSvgSprite', () => {

	return gulp.src(paths.svg.src)
		.pipe(plumber())
		.pipe(svgSprite({
			mode: {
				symbol: true
			}
		}))
		.pipe(gulp.dest(paths.svg.dist));

});

gulp.task('watch', () => {

	gulp.watch(paths.svg.src, ['buildSvgSprite']);
    gulp.watch(paths.sass.src, ['sass']);
    gulp.watch(paths.serverTs.src, ['serverTs']);
    gulp.watch(paths.uiTs.src, ['uiTs']);

});

gulp.task('default', ['serverTs', 'uiTs', 'sass', 'buildSvgSprite', 'watch']);
