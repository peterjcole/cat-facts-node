const express = require('express');
const router = express.Router();
const factPersister = require('../db/factPersister')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let facts = await factPersister.getFacts()
    res.render('facts', { facts: facts })
});

module.exports = router;


