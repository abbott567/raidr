const express = require('express');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const join = parseInt(req.body.join, 10);
  if (join === 1) {
    res.redirect('await-decision');
  } else {
    res.redirect('show-raid-team');
  }
});

module.exports = router;
