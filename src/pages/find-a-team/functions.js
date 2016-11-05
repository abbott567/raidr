module.exports = {
  validate: req => {
    const raid = parseInt(req.body.raid, 10);
    const errors = [];

    if (!raid || raid > 8) {
      errors.push('Choose a raid');
    }
    return errors;
  }
};
