require('dotenv').config();
// const { getActor, getActors } = require('../db/data-helpers');
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
          dob: 'December 17, 1985',
          pob: 'Test Place',
          __v: 0
        });
      });
  });
});
