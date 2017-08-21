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
        const revArr = restaurant.reviews;
        // console.log('revArr: ', revArr);
        if (revArr.length > 0) {
            revArr.forEach(ele => {
                if(ele.email) {
                    return next({
                        code: 400,
                        error: 'This reviewer has already posted a review.'
                    })
                }
            })
        } else {
            restaurant.reviews.push(review)
            return restaurant;
        }
        return restaurant;
    })
    .then(rest => {
        return Restaurant.findByIdAndUpdate(rest._id, {reviews: rest.reviews},{new: true})
        .then(result => {
            return res.send(result)
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