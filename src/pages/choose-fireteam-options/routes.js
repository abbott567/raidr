const express = require('express');
const template = require('./template.marko');
const {validate} = require('./functions');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const gameType = req.body['game-type'];
  const errors = validate();
  if (errors.length === 0) {
    if (gameType === 'solo') {
      res.redirect('/which-raid-solo');
    } else {
      res.redirect('/which-raid-team');
    }
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
