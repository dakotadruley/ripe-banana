const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router();
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  });

// .get('/', (req, res, next) => {
//     Blog
//       .find()
//       .then(blogs => res.send(blogs))
//       .catch(next);
//   })

//   .get('/:id', (req, res, next) => {
//     Comment
//       .findById(req.params.id)
//       .populate('blogId')
//       .then(comment => res.send(comment))
//       .catch(next);
//   })



// GET /actors
// [{ _id, name }]

// GET /actors/:id
// {
//     name,
//     dob,
//     pob,
//     films: [{
//       id,
//       title,
//       released
//     }]
// }
