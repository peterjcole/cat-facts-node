const express = require('express');
const router = express.Router();
const dbHelpers = require('../dbHelpers')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let facts = await dbHelpers.getFacts()
    res.render('facts', { facts: facts })
});

module.exports = router;


