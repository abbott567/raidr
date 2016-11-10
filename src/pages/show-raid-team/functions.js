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
    return new Promise((resolve, reject) => {
      const language = req.cookies.player.language;
      const raid = req.params.raidId;
      Game.findOne(
        {language, raid, spaces: {$gt: 0}},
        'host',
        {sort: {createdAt: 1}},
        (err, host) => {
          if (err) {
            reject(err);
          } else if (host) {
            resolve(host);
          } else {
            resolve();
          }
        }
      );
    });
  }
};

// SELECT host
// FROM games
// WHERE language = language, raid = raid, spaces > 0
// ORDER BY createdAt DESC
// LIMIT 1
