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
        const query = req.query || null;
        Restaurant.find(query)
            .then(results => res.send(results))
            .catch(next);
    })
    .get('/restaurant/:id', (req, res, next) => {
        const idToFind = req.body.id;
        Restaurant.findById(idToFind)
            .then(found => res.send(found))
            .catch(next);
    })





module.exports = router;

// POST to /restaurant/:id/reviews

// POST to /restaurant
// GET to /restaurants
// GET to /restaurants/:id
// GET to /restaurants?cuisine=<name of cuisine>

