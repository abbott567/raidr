module.exports = {
  validate: req => {
    const raid = parseInt(req.body.raid, 10);
    const players = parseInt(req.body.players, 10);
    const errors = [];

    if (!raid) {
      errors.push('Choose a raid');
    }

    if (!players) {
      errors.push('Choose number of players');
    }

    if (players > 5) {
      errors.push('Too many players');
    }

    return errors;
  }
};
