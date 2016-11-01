const express = require('express');
const request = require('got');

const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {title: 'Express'});
});

module.exports = router;
