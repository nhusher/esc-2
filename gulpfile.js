var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build-js', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });
  
    return gulp.src(['./src/js/client/index.js'])
        .pipe(browserified)
    //    .pipe(uglify())
        .pipe(rename("client.js"))
        .pipe(gulp.dest('./public/js/'));
});