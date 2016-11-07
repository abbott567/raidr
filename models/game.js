const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  host: String,
  raid: String,
  language: String,
  spaces: Number
});

module.exports.Game = gameSchema;
