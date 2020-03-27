require('dotenv').config();
const { getFilm, 
  getFilms, 
  getActor,
  getStudio } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();

    return request(app)
      .post('/api/v1/films') 
      .send({
        title: 'Film Title',
        studio: studio._id,
        released: 2009,
        cast: [{
          role: 'Lead',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Film Title',
          studio: studio._id,
          released: 2009,
          cast: [{
            _id: expect.any(String),  
            role: 'Lead',
            actor: actor._id
          }],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    // need filmss as well since we are populating in route
    // const filmss = await getfilmss({ actorId: actor._id });

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film,
        //   {
        //     title,
        //     released,
        //     studio: { _id, name },
        //     cast: [{
        //         _id,
        //         role,
        //         actor: { _id, name }
        //     }],
        //     reviews: [{
        //         id,
        //         rating,
        //         review,
        //         reviewer: { _id, name }
        //     ]
        // }
        });
      });
  });
});
