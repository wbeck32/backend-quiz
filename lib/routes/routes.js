const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant-model');

router
    .post('/', (req, res, next) => {
        const restaurant = new Restaurant(req.body);
        restaurant.save()
            .then(restaurant => res.send(restaurant))
            .catch(next);
    })
    .post('/:id/reviews', (req, res, next) => {
        const {restId, review} = req.body;
        return Restaurant.findById({ _id: restId })
            .then(restaurant => {
                console.log('TTTTT: ',restaurant);

                // const revArr = foundOne.reviews;
                // console.log('revArr: ', revArr);
                // if (revArr.length > 0) {
                //     revArr.forEach(ele => {
                //         // if email exists next = err
                //         console.log('rv: ',ele);
                //     })
                // } else {
                //     // console.log('f1: ', foundOne)
                //     foundOne.reviews.push(review)
                //     return foundOne;
                // }
                restaurant.reviews.push(review)
                console.log('after push: ', restaurant)
                return restaurant;
            })
            .then(rest => {
                console.log('rest: ', rest)
                // return Restaurant.update({ _id: rest._id, { $set: { reviews: rest.reviews }}})
                //     .then(result => {

                //         // foundIt = andNow;
                //         console.log('f1: ', result);
                //         // return foundIt;
                //     })

            })
            .catch(next);
    })
    .get('/restaurants', (req, res, next) => {
        const query = req.query || null;
        Restaurant.find(query)
            .then(results => res.send(results))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
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