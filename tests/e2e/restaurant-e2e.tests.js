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
  }), it('GET restaurant by cuisine', () => {
    return req
      .get('/restaurants')
      .query({ cuisine: 'comfort' })
      .then(results => {
        console.log(results.body)
        assert.equal(results.body.length, 1);
      });
  }), it('POST three reviews from three different users', () => {
    return req.get('/restaurants')
    .then(results =>{
      console.log(results.body);

    return req.post('/:id/reviews')
    .send({ review: testHelper.reviews[0], restId: results.body[0]._id })
    .then(saved => {
        console.log('in save array: ', saved);
        return saved;
    })
  })
  });
});

//    assert.equal(saved.name, 'Food Coma');
//     return req.post('/reviews')
//         .send({ restaurantId: saved._id, reviews: testHelper.reviews })
//         .then(results => {
//             // console.log(results);
//             // assert.equal(results.body[0].cuisine, 'comfort');
//             return req.post('/reviews')
//                 .send({ restaurantId: saved._id, reviews: testHelper.dupeReview })
//                 .then(results => {
//                     // console.log(results);
//                     // assert.equal(results.body[0].cuisine, 'comfort');
//                 })
//         })

//   * POST two restaurants, each of a different type of cuisine
//   * **Test** that `GET` `/restaurants` returns both restaurants
//   * **Test** that `GET` `/restaurants?cuisine=<one of the cuisines>` only returns one of the restaurants
//   * POST three reviews from three different user emails to one of the restaurants
//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews
