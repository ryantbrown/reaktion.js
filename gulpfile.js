var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');

gulp.task('css', function () {
    gulp.src('./src/less/reaktion.less')
        .pipe(less())
        .pipe(prefix())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./src/css'))
        .pipe(minify())
        .pipe(rename('reaktion.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('script', function() {
    gulp.src('./src/js/reaktion.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rename('reaktion.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function(){
    gulp.start('css');
    gulp.start('script');
});