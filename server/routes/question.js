const express = require('express');
const router = express.Router();
const question = require('../services/question');


router.get('/all', async function(req, res, next) {
  try {
    res.json(await question.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting all question table`, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
    try {
      res.json(await question.getSingle(req.params.id));
    } catch (err) {
      console.error(`Error while getting question ${req.params.id}`, err.message);
      next(err);
    }
});

router.get('/:id/cards', async function(req, res, next) {
  try {
    res.json(await question.getCards(req.params.id));
  } catch (err) {
    console.error(`Error while getting question ${req.params.id}`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await question.create(req.body));
    } catch (err) {
        console.error('Error while creating question', err.message);
        next(err);
    }
});

router.post('')

module.exports = router;