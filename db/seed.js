const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
// const MonsterReview = require('../lib/models/MonsterReview');

module.exports = async({ actorsToCreate = 10, studiosToCreate = 5, reviewersToCreate = 5, filmsToCreate = 5 } = {}) => {
  // cookiesToCreate = 12, monsterReviewToCreate = 20 
//   const ingredientTypes = ['chocolate', 'raisins', 'salt', 'sugar'];

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
    studioId: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [{
      role: chance.profession(),
      actorId: chance.pickone(actors)._id
    }]
  })));

};
