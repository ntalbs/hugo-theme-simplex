var gulp = require('gulp')
var stylus = require('gulp-stylus')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('default', function () {
  gulp.src('styl/style.styl')
    .pipe(stylus({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('static/css/'))
})

gulp.task('watch', function () {
  gulp.watch('styl/style.styl', function () {
    gulp.src('styl/style.styl')
      .pipe(stylus({outputStyle: 'compressed'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest('static/css/'))
  })
})
