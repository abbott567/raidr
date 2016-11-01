const express = require('express');
const {getBungieId} = require('./functions');

const router = new express.Router();

/* GET home page. */
router.post('/', (req, res) => {
  const bungieId = getBungieId(req.body.platform, req.body['gamer-tag']);
  console.log(bungieId);
});

module.exports = router;
