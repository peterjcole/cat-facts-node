const express = require('express');
const router = express.Router();
const dbHelpers = require('../dbHelpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meow' });
});

module.exports = router;
