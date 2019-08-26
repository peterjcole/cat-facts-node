
const express = require('express');
const router = express.Router();
const factPersister = require('../../db/factPersister')

router.get('/', async function(req, res, next) {
  res.send(await factPersister.getFacts())
});

router.post('/', async function(req, res, next) {
  console.log(req.params)
  res.send(await factPersister.postFact(req.query))
})

router.get('/random', async function(req, res, next) {
  res.send(await factPersister.getRandomFact())
})

router.get('/today', async function(req, res, next) {
  res.send(await factPersister.getToday())
}) 

router.post('/approve'), async function(req, res, next) {
  if(req.query.secret === process.env.SECRET) {
    res.send(await factPersister.approve(req.id))
  } else {
    throw new Error('Unauthenticated')
  }
}

module.exports = router
