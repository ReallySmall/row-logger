const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),

const paths = {
	serverViews: {
		src: ['./server/src/views/**.*'],
		dist: './server/dist/views'
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

gulp.task('serverViews', () => {

	return gulp.src(paths.serverViews.src)
		.pipe(plumber())	
        .pipe(gulp.dest(paths.serverViews.dist));

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
    gulp.watch(paths.serverViews.src, ['serverViews']);

});

gulp.task('default', ['serverViews', 'sass', 'buildSvgSprite', 'watch']);
