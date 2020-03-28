require('dotenv').config();
const { getStudio, getStudios, getFilms } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Studio routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio Test',
        address: {
          city: 'LA',
          state: 'CA',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Studio Test',
          address: {
            city: 'LA',
            state: 'CA',
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });

  it('gets a studio by id', async() => {
    const studio = await getStudio();
    const films = await getFilms({ 'studio': studio._id });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio,
          films
        });
      });
  });
});
