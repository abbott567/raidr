const express = require('express');
const {getBungieId, validate} = require('./functions');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const valid = validate(req);
  if (valid) {
    res.redirect('next');
  } else {
    template.render({error: 'Error'}, res);
  }
});

module.exports = router;
