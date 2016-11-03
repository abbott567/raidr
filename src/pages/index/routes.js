const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.redirect('/enter-gamertag');
});

module.exports = router;
