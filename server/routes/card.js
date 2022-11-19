const express = require('express');
const router = express.Router();
const card = require('../services/card');

router.post("/", async (req, res, next) => {
    try {
        res.json(await card.create(req.body))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

module.exports = router;