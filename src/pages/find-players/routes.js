const express = require('express');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  res.redirect('await-response');
});

module.exports = router;
