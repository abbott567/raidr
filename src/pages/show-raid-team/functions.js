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
  }
};
