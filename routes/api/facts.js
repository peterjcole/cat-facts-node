const express = require('express');
const router = express.Router();
const db = require('../../dbConnection');
const factPersister = require('../../db/factPersister')

router.get('/', async function(req, res, next) {
  res.send(await factPersister.getFacts())
});

router.post('/', async function(req, res, next) {
  console.log(req.params)
  const fact = {
    name: req.query.name,
    fact: req.query.fact,
    approved: false
  }
  res.send(await factPersister.postFact(fact))
})

module.exports = router
