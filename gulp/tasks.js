/*
  tasks.js
  ===========
  defaults overkill at the moment, but set up to run multiple tasks
*/

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', done => {
  runSequence('nodemon', done);
});
