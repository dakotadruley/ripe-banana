require('dotenv').config();
const { getReviewer, getReviewers } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('Reviewer routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Reviewer Test',
        company: 'Company Test',
        // films: [{
        //   id, 
        //   title,
        //   released
        // }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Reviewer Test',
          company: 'Company Test',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    // need filmss as well since we are populating in route
    // const filmss = await getfilmss({ actorId: actor._id });

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          // films - because we populate in route
          // GET /actors/:id
        //   reviews: [{
        //     _id,
        //     rating,
        //     review,
        //     film: { _id, title }
        // }]
        });
      });
  });
});
