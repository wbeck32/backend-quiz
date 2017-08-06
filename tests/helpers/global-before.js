require('dotenv').config()
const dbUri = process.env.MONGO_URI;
const connect = require('../../lib/connect');
const mongoose = require('mongoose');
const testHelper = require('./test-helper');

before(() => {
    connect(dbUri);
    mongoose.connection.dropDatabase();

    let testRestaurant = testHelper.restaurant;

    return Promise.all([
        testHelper.saveRestaurant(testRestaurant)
        .then(restaurant => testRestaurant = restaurant)
    ])
    .then(() => {
        return testRestaurant;
    });
});

beforeEach(() =>{
    mongoose.connection.dropDatabase();
})