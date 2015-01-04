var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

// This is so fucking terrible
process.env.NODE_ENV = 'production';

gulp.task('build-js', function() {
  return gulp.src('src/js/client/index.js')
    .pipe(browserify({transform: [ 'envify' ]}))
    .pipe(rename('client.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js/'));
});