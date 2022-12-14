const e = require('express');
const express = require('express');
const router = express.Router();
const course = require('../services/course');

/* GET programming languages. */
router.get('/all', async function(req, res, next) {
  try {
    res.json(await course.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting course table`, err.message);
    next(err);
  }
});

router.get('/:id/questions', async function(req, res, next){
  try {
    res.json(await course.getQuestions(req.params.id));
  } catch (err) {
    console.error(`Error while getting questions for course id ${req.params.id}`);
    next(err);
  }
})
router.get('/:id/studySets', async function(req, res, next){
  try {
    res.json(await course.getStudySets(req.params.id));
  } catch (err) {
    console.error(`Error while getting studysets for course id ${req.params.id}`);
    next(err);
  }
})
router.get('/:id/students', async function(req, res, next){
  try {
    res.json(await course.getStudents(req.params.id));
  } catch (err) {
    console.error(`Error while getting students for course id ${req.params.id}`);
    next(err);
  }
})


router.post('/', async function(req, res, next) {
  try {
      res.json(await course.create(req.body));
  } catch (err) {
      console.error('Error while creating question', err.message);
      next(err);
  }
});

router.post('/:id/:student', async function(req, res, next){
  try {
    res.json(await course.addStudent(req.params.id, req.params.student));
  } catch (err) {
    console.error(`Error while add students for course id ${req.params.id}`);
    next(err);
  }
})

module.exports = router;