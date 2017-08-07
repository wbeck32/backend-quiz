const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
require('dotenv').config()
const dbUri = process.env.MONGO_URI;
const connect = require('../../lib/connect');
const mongoose = require('mongoose');
const testHelper = require('../helpers/test-helper');

describe('restaurant API', () => {
    before(() => {
        connect(dbUri);
        mongoose.connection.dropDatabase();
    });

    let testRestaurantA = testHelper.restaurantA;
    let testRestaurantB = testHelper.restaurantB;

    it('POST /restaurant', () => {
        return Promise.all([
                testHelper.saveRestaurant(testRestaurantA)
                .then(restaurant => testRestaurantA = restaurant),
                testHelper.saveRestaurant(testRestaurantB)
                .then(restaurant => testRestaurantB = restaurant)
            ])
            .then(() => {
                assert.equal(testRestaurantA.name, 'Food Coma');
            });
    })
})



//   * POST two restaurants, each of a different type of cuisine
//   * **Test** that `GET` `/restaurants` returns both restaurants
//   * **Test** that `GET` `/restaurants?cuisine=<one of the cuisines>` only returns one of the restaurants
//   * POST three reviews from three different user emails to one of the restaurants
//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews