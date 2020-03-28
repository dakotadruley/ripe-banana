require('dotenv').config();
const { getFilm,
  getFilms,  
  getActor,
  getStudio,
  getStudios,
  getReviews } = require('../db/data-helpers');
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
    const studios = await getStudios();
    const films = await getFilms();
    const filmsWithStudions = films.map(film => {
      const studio = studios.find(studio => studio._id === film.studio);
      delete film.cast;
      return { 
        ...film,
        studio: { _id: studio._id, name: studio.name }
      };
    });

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(filmsWithStudions);
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

});
