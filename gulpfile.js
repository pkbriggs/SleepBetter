var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant
var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cache');
var coffee = require('gulp-coffee');

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('sass', function () {
  return gulp.src('./css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jade', function() {
  return gulp.src('./views/**/*.jade')
    .pipe(jade()) // pip to jade plugin
    .pipe(gulp.dest('./dist')); // tell gulp our output folder
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-lib', function() {
  gulp.src('./lib/js/*.js')
    .pipe(gulp.dest('./dist'));
  gulp.src('./lib/css/*.css')
    .pipe(gulp.dest('./dist'));
});

gulp.task('imagemin', function() {
  return gulp.src('./img/*')
    .pipe(imagemin({
    // .pipe(cache(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    // })))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
  gulp.watch('./views/**/*.jade', ['jade']);
  gulp.watch('./img/*', ['imagemin']);
  gulp.watch('./coffee/*', ['coffee']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['sass', 'jade', 'imagemin', 'coffee', 'copy-lib']);

gulp.task('default', ['build', 'webserver', 'watch']);


// var gulp = require('gulp');

// gulp.task('default', function() {
//   console.log("I am default");
// });