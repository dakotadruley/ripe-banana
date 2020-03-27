const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
// const Cookie = require('../lib/models/Cookie');
// const MonsterReview = require('../lib/models/MonsterReview');

module.exports = async({ actorsToCreate = 10 } = {}) => {
  // cookiesToCreate = 12, monsterReviewToCreate = 20 
//   const ingredientTypes = ['chocolate', 'raisins', 'salt', 'sugar'];

  const actorNames = ['Coolio McSmith', 'Kennedy Davenport', 'Felica Waters'];
  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.pickone(actorNames),
    dob: chance.date(),
    pod: chance.sentence()
  })));
  //   const ingredients = await Ingredient.create([...Array(ingredientsToCreate)].map(() => ({
  //     name: `${chance.animal()} ${chance.pickone(ingredientTypes)}`,
  //     description: chance.sentence({ words: 3 })
  //   })));

  //   const cookies = await Cookie.create([...Array(cookiesToCreate)].map(() => ({
  //     name: `${chance.pickone(ingredientTypes)} ${chance.animal()}`,
  //     description: chance.sentence({ words: 3 }),
  //     ingredients: chance.pickset(ingredients, 4).map(ingredient => ingredient._id)
  //   })));

  //   chance.d100();

//   await MonsterReview.create([...Array(monsterReviewToCreate)].map(() => ({
//     name: chance.name(),
//     rating: chance.integer({ min: 1, max: 5 }),
//     content: chance.sentence({ word: 10 }),
//     cookie: chance.pickone(cookies)._id
//   })));
};
