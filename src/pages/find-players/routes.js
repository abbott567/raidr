const express = require('express');
const template = require('./template.marko');
const {validate, createGame, saveGame} = require('./functions');

const router = new express.Router();

router.get('/', (req, res) => {
  const language = req.cookies.player.language;
  const gamertag = req.cookies.player.gamertag;

  if (!language || !gamertag) {
    res.redirect('/');
  } else {
    template.render({}, res);
  }
});

router.post('/', (req, res) => {
  const errors = validate(req);
  if (errors.length === 0) {
    const game = createGame(req);
    saveGame(game)
    .then(() => {
      res.redirect('await-response');
    })
    .catch(err => {
      console.log(err);
      template.render({errors: ['Database error. Try again']}, res);
    });
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
