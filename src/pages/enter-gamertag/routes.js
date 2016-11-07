const express = require('express');
const {validate, buildPlayerObject} = require('./functions');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
  const errors = validate(req);
  if (errors.length === 0) {
    buildPlayerObject(req)
    .then(player => {
      player.language = req.body.language;
      res.cookie('player', player);
      res.redirect('/awaiting-orbit');
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
