const express = require('express');
const template = require('./template.marko');
const {validate} = require('./functions');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const errors = validate(req);
  if (errors.length === 0) {
    res.redirect('await-response');
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
