const express = require('express');
const router = express.Router();
const student = require('../services/student');

router.post("/", async (req, res, next) => {
    try {
        res.json(await student.create(req.body))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await student.get(req.params.id))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

router.get("/:id/cards", async (req, res, next) => {
    try {
        res.json(await student.getCards(req.params.id))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

router.get("/:id/studySets", async (req, res, next) => {
    try {
        res.json(await student.getStudySets(req.params.id))
    } catch (err) {
        console.error('Error', err.message);
        next(err)
    }
})

module.exports = router;