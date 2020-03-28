require('dotenv').config();
const { getActor, getActors, getFilms } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Actor routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Actor Test',
        dob: 'December 17, 1985',
        pob: 'Test Place',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Actor Test',
          dob: expect.any(String),
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
    const films = await getFilms({ 'cast.actor': actor._id });

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...actor,
          films
        });
      });
  });
});
