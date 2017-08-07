const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant-model');

router
    .post('/restaurant', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant.save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })
    .post('/reviews', (req, res, next) => {
        let foundOne = {};
        return Restaurant.findOne({ _id: req.body.restId })
            .then(foundOne => {
                const revArr = foundOne.reviews;
                if (revArr.length > 0) {
                    revArr.forEach(ele => {
                        // if email exists next = err
                        console.log(ele);
                    })
                } else {
                    foundOne.reviews = req.body.reviews;
                }
                return foundOne;
            })
            .then(foundIt => {
                // console.log('ggggg: ',ggg, foundOne)
                foundIt.save()
                    .then(andNow => {
                        foundIt = andNow;
                        console.log('f1: ', foundIt);
                        return foundIt;
                    })

            })
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