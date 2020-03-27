require('dotenv').config();
const { getStudio, getStudios } = require('../db/data-helpers');
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
        // films: [{
        //   id, 
        //   title,
        //   released
        // }]
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

  it('gets an actor by id', async() => {
    const studio = await getStudio();
    // need filmss as well since we are populating in route
    // const filmss = await getfilmss({ actorId: actor._id });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio,
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
