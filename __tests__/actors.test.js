require('dotenv').config();
const { getActor, getActors } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Actor routes', () => {
  it('creates a blog', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Actor Test',
        dob: 'December 17, 1985',
        pob: 'Test Place',
        // films: [{
        //   id, 
        //   title,
        //   released
        // }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Actor Test',
          dob: '1985-12-17T08:00:00.000Z',
          pob: 'Test Place',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    // need filmss as well since we are populating in route
    // const filmss = await getfilmss({ actorId: actor._id });

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...actor,
          // films - because we populate in route
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
        });
      });
  });
});
