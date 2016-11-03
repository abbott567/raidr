const express = require('express');
const {getBungieId} = require('./functions');
const template = require('./template.marko');

const router = new express.Router();

router.get('/', (req, res) => {
  template.render({}, res);
});

router.post('/', (req, res) => {
});

module.exports = router;
