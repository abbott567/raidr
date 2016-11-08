'use strict';
const mongoose = require('mongoose');

const Game = mongoose.model('Game');
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
    const raid = req.body.raid;
    const spaces = req.body.players;
    const language = req.cookies.player.language;
    const gamertag = req.cookies.player.gamertag;
    const platform = req.cookies.player.platform;

    if (raid && spaces && language && gamertag) {
      return new Game({
        host: gamertag,
        platform,
        raid,
        language,
        spaces
      });
    }
    return false;
  },

  saveGame: game => {
    return new Promise((resolve, reject) => {
      game.save()
      .then(() => {
        console.log('game saved');
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }
};
