const express = require('express');
const template = require('./template.marko');
const host = require('../../../config/host');

const router = new express.Router();

router.get('/', (req, res) => {
  if (req.cookies.player) {
    template.render({status: true, host}, res);
  } else {
    template.render({status: false, host}, res);
  }
});

module.exports = router;
