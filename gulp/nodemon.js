/*
  nodemon.js
  ===========
  uses nodemon to run a server, watches for changes
*/

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', () => {
  nodemon(
    {
      script: './bin/www',
      ext: '*',
      ignore: ['*.marko.js']
    }
  );
});
