require('dotenv').config();
const { getFilm, 
  getFilms, 
  getActor,
  getActors,
  getStudio } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
    console.log(studio);
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

  //   it('gets a reviewer by id', async() => {
  //     const reviewer = await getReviewer();
  //     // need filmss as well since we are populating in route
  //     // const filmss = await getfilmss({ actorId: actor._id });

  //     return request(app)
  //       .get(`/api/v1/reviewers/${reviewer._id}`)
  //       .then(res => {
  //         expect(res.body).toEqual({
  //           ...reviewer,
  //           // films - because we populate in route
  //           // GET /actors/:id
  //         //   reviews: [{
  //         //     _id,
  //         //     rating,
  //         //     review,
  //         //     film: { _id, title }
  //         // }]
  //         });
  //       });
  //   });

  //   it('updates a reviewer by id', async() => {
  //     const reviewer = await getReviewer();

//     return request(app)
//       .patch(`/api/v1/reviewers/${reviewer._id}`)
//       .send({ name: 'Test name' })
//       .then(res => {
//         expect(res.body).toEqual({
//           ...reviewer,
//           name: expect.any(String)
//         });
//       });
//   });
});
