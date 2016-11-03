module.exports = {
  validate: req => {
    const raid = req.body.raid;
    const language = req.body.language;
    const errors = [];

    if (!raid) {
      errors.push('Choose a raid');
    }

    if (!language) {
      errors.push('Choose a language');
    }
    return errors;
  }
};
