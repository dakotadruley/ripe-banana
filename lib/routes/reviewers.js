const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
    //   .populate('filmId')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
