var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');

// This is so fucking terrible
process.env.NODE_ENV = 'production';

gulp.task('build-js', function() {
    gulp.src('src/js/client/index.js')
        .pipe(browserify({transform: [ 'envify' ]}))
        .pipe(rename('client.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('copy-css', function() {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('public/css/'));
});

gulp.task('clean', function() {
    gulp.src('public/', { read: false })
        .pipe(clean());
});

gulp.task('default', [ 'build-js', 'copy-css' ]);