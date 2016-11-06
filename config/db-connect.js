'use strict';
const mongoose = require('mongoose');

const devMode = process.env.NODE_ENV === 'development';

if (devMode) {
  mongoose.connect('mongodb://localhost/raidr');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('database connected');
  });
  module.exports = db;
}
