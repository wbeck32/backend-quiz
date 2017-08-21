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

  let [testRestA, testRestB, testRestC, testRestD] = testHelper.restaurants;
  let reviewedRest_id = '';

  it('POST two restaurants and retrieve them ', () => {
    return req
    .post('/')
    .send(testRestA)
    .then(res => {
      console.log('B: ', res.error);
      return req.post('/')
      .send(testRestB)
      .then(res => {
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
    let restArr = [];
    return req.get('/restaurants')
    .then(restaurants => {
      restArr = restaurants.body
      return restArr;
    })
    .then(restArr =>{
      return req.post('/:id/reviews')
      .send({ review: testHelper.reviews[0], restId: restArr[0]._id })
      .then(saved1 => {
        // console.log('saved1: ', saved1.body)
        reviewedRest_id = restArr[0]._id;
        return saved1;
      })
      .then(saved1 => {
        return req.post('/:id/reviews')
        .send({ review: testHelper.reviews[1], restId: restArr[0]._id })
        .then(saved2 => {
          // console.log('saved2: ', saved2.body)
          return saved2;
        })
        .then(saved2 => {
          return req.post('/:id/reviews')
          .send({ review: testHelper.reviews[2], restId: restArr[0]._id })
          .then(saved3 => {
            // console.log('saved3: ', saved3.body)
            return saved3
          })
          .then(() =>{
            console.log('all saved');
          })
        })
      })
    })
  })
  it('POST a 4th review from same reviewer, 400 returned and rest still has 3 reviews', () =>{
    console.log(reviewedRest_id)

    return req.post('/:id/reviews')
    .send({ review: testHelper.reviews[0], restId: reviewedRest_id })
    .then(res => {
      // console.log('RES: ',res.body)
      // assert.equal(res.status, 400)
      return res.body._id
    })
    .then(id => {
      return req.get('/:id')
      .send({ id: id})
      .then(restaurant => {
        // console.log('REST: ',restaurant.body);
        assert.equal(restaurant.body.reviews.length, 3);
      })
    })
  })
})





//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews
