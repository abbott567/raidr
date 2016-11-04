module.exports = {
  validate: req => {
    const raid = req.body.raid;
    const errors = [];

    if (!raid) {
      errors.push('Choose a raid');
    }

    return errors;
  }
};
