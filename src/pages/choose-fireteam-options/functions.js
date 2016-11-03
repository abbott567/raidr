module.exports = {
  validate: req => {
    const gameType = req.body['game-type'];
    const errors = [];

    if (!gameType) {
      errors.push('Choose a game type');
    }
    return errors;
  }
};
