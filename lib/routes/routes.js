const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant-model');

function hasRequiredFields(req, res, next) {
    const restaurant = new Restaurant(req.body);
    const cuisine = Restaurant.schema.obj.cuisine.enum;
    if (!restaurant.name || !restaurant.cuisine || cuisine.indexOf(restaurant.cuisine) < 0) {
        return next({
            code: 400,
            error: 'This restaurant isn\'t valid.'
        })
    }
    next();
}

router
.post('/', hasRequiredFields, (req, res, next) => {
    const restaurant = new Restaurant(req.body);

    // if (!restaurant.name || !restaurant.cuisine) {
    //     res.status(400).send({ error: 'This restaurant is not valid.' });
    // }
    return restaurant.save()
    .then(response => {
        res.send(response);
    })
    .catch(next);
})
.post('/:id/reviews',  (req, res, next) => {
    const {restId, review} = req.body;
    return Restaurant.findById({ _id: restId })
    .then(restaurant => {
        // if (restaurant.reviews.length > 0) {
        //     restaurant.reviews.forEach(ele => {
        //         if(ele.email == review.email) {
        //             console.log(ele.email, review.email)
        //             return next({
        //                 code: 400,
        //                 error: 'This reviewer has already reviewed this restaurant.'
        //             })
        //             next();
        //         }
        //     })
        // } else {
            restaurant.reviews.push(review)
            return restaurant;

        // }
        // return restaurant;

    })
    .then(rest => {
        // console.log('???: ', rest)
        return Restaurant.findByIdAndUpdate(rest._id, {reviews: rest.reviews})
        .then(result => {
            res.send(result)
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