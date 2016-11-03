/*
  tasks.js
  ===========
  defaults wraps generate-assets and watch
*/

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./src/common/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('style.css'))
  .pipe(gulp.dest('./public/stylesheets'));
});
