const mongoose = require('mongoose');

const Game = mongoose.model('Game');

module.exports = {
  validate: req => {
    const join = parseInt(req.body.join, 10);
    const errors = [];

    if (join === 0) {
      return errors;
    }

    if (!join || join > 1) {
      errors.push('Choose yes or no');
    }

    return errors;
  },

  findGame: req => {
    const language = req.cookies.player.language;
    const raid = req.body.raid;
    console.log(raid)
    Game.findOne({language, raid}, 'host', (err, host) => {
      console.log(host);
    });
  }
};
