const express = require('express');
const template = require('./template.marko');
const {validate, findGame} = require('./functions');

const router = new express.Router();

router.get('/:raidId', (req, res) => {
  findGame(req)
  .then(host => {
    if (host) {
      template.render({host}, res);
    } else {
      template.render({waiting: true}, res);
    }
  })
  .catch(err => {
    template.render({errors: [err]}, res);
  });
});

router.post('/', (req, res) => {
  const join = parseInt(req.body.join, 10);
  const errors = validate(req);
  if (errors.length === 0 && join === 1) {
    res.redirect('await-decision');
  } else if (errors.length === 0 && join === 0) {
    res.redirect('show-raid-team');
  } else {
    template.render({errors}, res);
  }
});

module.exports = router;
