'use strict';
const mongoose = require('mongoose');

const devMode = process.env.NODE_ENV === 'development';

if (devMode) {
  mongoose.connect('mongodb://localhost/raidr');
  const db = mongoose.connection;
  module.exports = db;
}
