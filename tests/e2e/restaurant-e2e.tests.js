const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
require('dotenv').config();
const dbUri = process.env.MONGO_URI;
const connect = require('../../lib/connect');
const mongoose = require('mongoose');
const testHelper = require('../helpers/test-helper');
const req = require('../helpers/request');

describe('restaurant API', () => {
  connect(dbUri);

  before(() => {
    mongoose.connection.dropDatabase();
  });

  let [testRestA, testRestB, testRestC] = testHelper.restaurants;

  it('POST two restaurants and retrieve them ', () => {
    return req
    .post('/')
    .send(testRestA)
    .then(res => {
      return req.post('/')
      .send(testRestB)
      .then(res => {
        // console.log('B: ', res.body);
      })
    })
    .then(() => {
      return req.get('/restaurants').then(results => {
        assert.equal(results.body.length, 2);
        assert.equal(results.body[1].name, 'Next Door to Food Coma');
      });
    })
    .catch();
  }), it('GET restaurant by id', () => {
    return req.post('/')
    .send(testRestC)
    .then(res => {
      return req
      .get('/:id')
      .send({ id: res.body._id })
      .then(found => {
        assert.equal(found.body.name, testRestC.name);
      });
    });
  }),
  it('GET restaurant by cuisine', () => {
    return req
    .get('/restaurants')
    .query({ cuisine: 'comfort' })
    .then(results => {
      assert.equal(results.body[0].cuisine, 'comfort');
      assert.equal(results.body.length, 1);
    });
  }),
  it('POST three reviews from three different users', () => {
    return req.get('/restaurants')
    .then(results => {
      return results.body;
    })
    .then(restaurants => {
      return req.post('/:id/reviews')
      .send({ review: testHelper.reviews[0], restId: restaurants[0]._id })
      .then(saved1 => {
        return req.post('/:id/reviews')
        .send({ review: testHelper.reviews[1], restId: restaurants[1]._id })
      })
      .then(saved2 =>{
        return req.post('/:id/reviews')
        .send({ review: testHelper.reviews[2], restId: restaurants[2]._id })
      })
      .then(saved3 => {
        return saved3
      })
    })
    .then(() =>{
      console.log('all saved');
    })
  })
})





//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews
