const express = require('express');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  if (req.cookies.player) {
    template.render({status: true}, res);
  } else {
    template.render({status: false}, res);
  }
});

module.exports = router;
