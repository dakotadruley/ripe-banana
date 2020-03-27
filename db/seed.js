const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

module.exports = async({ actorsToCreate = 10, studiosToCreate = 5, reviewersToCreate = 5, filmsToCreate = 5, reviewsToCreate = 10 } = {}) => {

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pod: chance.sentence()
  })));

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [{
      role: chance.profession(),
      actor: chance.pickone(actors)._id
    }]
  })));

  const reviews = await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: -10, max: 10 }),
    reviewer: chance.pickone(reviewers)._id,
    content: chance.paragraph({ sentences: 1 }),
    film: chance.pickone(films)._id
  })));

};
