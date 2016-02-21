var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('sass', function () {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-index-html', function() {
    gulp.src('./index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./*.scss', ['sass']);
  gulp.watch('./index.html', ['copy-index-html']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['sass', 'copy-index-html']);

gulp.task('default', ['build', 'webserver', 'watch']);


// var gulp = require('gulp');

// gulp.task('default', function() {
//   console.log("I am default");
// });