const express = require('express');
const router = express.Router();
const db = require('../../dbConnection');
const dbHelpers = require('../../dbHelpers')
let collection = db.collection('facts')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(dbHelpers.getFacts())
});

module.exports = router;


