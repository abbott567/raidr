const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  host: String,
  raid: String,
  language: String,
  platform: String,
  spaces: Number,
  createdAt: {type: Date, default: Date.now}
});

module.exports.Game = gameSchema;
