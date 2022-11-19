const express = require('express');
const router = express.Router();
const studySet = require('../services/studySet');

router.post("/", async (req, res, next) => {
    try {
        res.json(await studySet.create(req.body))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        res.json(await studySet.getAll())
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

router.get("/:id/cards", async (req, res, next) => {
    try {
        res.json(await studySet.getCards(req.params.id))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

module.exports = router;