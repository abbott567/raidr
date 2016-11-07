'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  validate: req => {
    const raid = parseInt(req.body.raid, 10);
    const players = parseInt(req.body.players, 10);
    const errors = [];

    if (!raid || raid > 8) {
      errors.push('Choose a raid');
    }

    if (!players) {
      errors.push('Choose number of players');
    }

    if (players > 5) {
      errors.push('Too many players');
    }

    return errors;
  },

  createGame: req => {
    const gameSchema = new mongoose.Schema({
      host: String,
      raid: String,
      language: String,
      spaces: Number
    });
    const Game = mongoose.model('Game', gameSchema);

    const newGameInstance = new Game({
      host: req.cookies.player.gamertag,
      raid: req.body.raid,
      language: req.cookies.player.language,
      spaces: req.body.players
    });
    return newGameInstance;
  },

  saveGame: game => {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/raidr');
      const db = mongoose.connection;
      db.once('open', () => {
        game.save()
        .then(() => {
          console.log('game saved');
          mongoose.disconnect();
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
      });

      db.on('error', () => {
        reject('database error');
      });
    });
  }
};
