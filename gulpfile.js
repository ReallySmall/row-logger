const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
ts = require('gulp-typescript'),
webpack = require('webpack-stream'),
reactWebpackConfig = require('./webpack.app.config.js');

const paths = {
	serverTs: {
		src: ['./server/src/**/*.ts'],
		dist: './server/dist'
	},
	serverViews: {
		src: ['./server/src/views/**.*'],
		dist: './server/dist/views'
	},
	app: {
		src: ['./app/**/*.ts', './app/**/*.tsx'],
		dist: './public/app'
	},
	sass: {
		src:'./ui/scss/**/*.scss',
		dist: './public/css'
	},
	svg: {
		src:'./ui/img/svg/**/*.svg',
		dist: './server/src/views'
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

gulp.task('serverViews', () => {

	return gulp.src(paths.serverViews.src)
		.pipe(plumber())	
        .pipe(gulp.dest(paths.serverViews.dist));

});

gulp.task('app', () => {

	return gulp.src(paths.app.src)
		.pipe(plumber())
		.pipe(webpack(reactWebpackConfig))
		.pipe(gulp.dest(paths.app.dist));

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
    gulp.watch(paths.serverViews.src, ['serverViews']);
    gulp.watch(paths.app.src, ['app']);

});

gulp.task('default', ['serverTs', 'serverViews', 'app', 'sass', 'buildSvgSprite', 'watch']);
