const express = require('express');
const {getBungieId, validate} = require('./functions');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const errors = validate(req);
  if (errors.length === 0) {
    res.redirect('next');
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
