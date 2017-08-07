const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant-model');
// const Review = require('../models/review-model');

router
    .post('/restaurant', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant.save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })
    .get('/restaurants', (req, res, next) => {
        Restaurant.find()
            .then(results => res.send(results))
    })


module.exports = router;

// POST to /restaurant/:id/reviews
// GET to /restaurants?cuisine=<name of cuisine>
// GET to /restaurants/:id

// POST to /restaurant
// GET to /restaurants

