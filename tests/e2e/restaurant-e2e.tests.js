const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
require('dotenv')
    .config()
const dbUri = process.env.MONGO_URI;
const connect = require('../../lib/connect');
const mongoose = require('mongoose');
const testHelper = require('../helpers/test-helper');
const req = require('../helpers/request');

describe('restaurant API', () => {
    connect(dbUri);

    beforeEach(() => {
        mongoose.connection.dropDatabase();
    });

    let testRestA = testHelper.restaurantA;
    let testRestB = testHelper.restaurantB;
    let testRestC = testHelper.restaurantC;

    it('POST /restaurant two restaurants and retrieve them ', () => {
            return testHelper.saveTwoRestaurants(testRestA, testRestB)
                .then(two => {
                    assert.equal(two[0].name, 'Food Coma');
                    return req.get('/restaurants')
                        .then(results => {
                            assert.equal(results.body.length, 2);
                            assert.equal(two[1].name, 'Next Door to Food Coma');
                        })
                });
        }),
        it('GETs restaurant by id /restaurant/:id', () => {
            return testHelper.saveRestaurant(testRestC)
                .then(restaurant => {
                    testRestC = restaurant;
                    return req.get('/restaurant/:id')
                        .send({ id: testRestC._id })
                        .then(found => {
                            assert.deepEqual(found.body, testRestC);
                        })

                })
        }),
        it('GETs restaurant by cuisine /restaurants', () => {
            return testHelper.saveTwoRestaurants(testRestA, testRestB)
                .then(two => {
                    assert.equal(two[0].name, 'Food Coma');
                    return req.get('/restaurants')
                        .query({ cuisine: 'comfort' })
                        .then(results => {
                            assert.equal(results.body[0].cuisine, 'comfort');
                        })
                });
        })
})



//   * POST two restaurants, each of a different type of cuisine
//   * **Test** that `GET` `/restaurants` returns both restaurants
//   * **Test** that `GET` `/restaurants?cuisine=<one of the cuisines>` only returns one of the restaurants
//   * POST three reviews from three different user emails to one of the restaurants
//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews