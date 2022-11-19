const express = require('express');
const router = express.Router();
const answer = require('../services/answer');

router.post("/", async (req, res, next) => {
    try {
        res.json(await answer.create(req.body))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

module.exports = router;