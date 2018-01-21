const gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber');

const paths = {
	sass: {
		src:'ui/scss/**/*.scss',
		dist: 'public/css'
	},
	svg: {
		src:'ui/img/**/*.svg',
		dist: 'public/img'
	}
}

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

});

gulp.task('default', ['sass', 'buildSvgSprite', 'watch']);
