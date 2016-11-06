const express = require('express');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  const player = req.cookies.player;

  if (player && player.character && player.completedRaids) {
    template.render({}, res);
  } else {
    template.render({errors: []}, res);
  }
});

module.exports = router;
