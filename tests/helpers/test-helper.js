const request = require('./request');

module.exports = {

    restaurants: [{
            name: 'Food Coma',
            address: {
                street: 'Main Street',
                city: 'Any City'
            },
            cuisine: 'other',
            reviews: []
        },

        {
            name: 'Next Door to Food Coma',
            address: {
                street: 'Main Street',
                city: 'Any City'
            },
            cuisine: 'comfort',
            reviews: []
        },
        {
            name: 'Yama',
            address: {
                street: 'NW 11th Avenue',
                city: 'Portland'
            },
            cuisine: 'euro',
            reviews: []
        },
        {
            name: 'Food Coma',
            address: {
                street: 'Main Street',
                city: 'Any City'
            },
            cuisine: '',
            reviews: []
        }
    ],

    reviews: [{
            rating: 5,
            comments: 'Our waiter...was determined to gaslight us into thinking we were having a good time. “Trump gets the taco bowl and the lasagna and baked ziti,” he said, before subsequently informing the table that we could not order the lasagna or baked ziti.@@@@@@',
            email: 'LOWERCASE@GMAIL.COM'
        },
        {
            rating: 3,
            comments: 'Our waiter...was determined to gaslight us into thinking we were having a good time before subsequently informing the table that we could not order the lasagna or baked ziti.',
            email: 'tastyfood@hungry.com'
        },
        {
            rating: 4,
            comments: 'WOW!',
            email: 'delicious@food.com'
        },
        {
            rating: 1,
            comments: 'I got food poisoning and thought I would die.',
            email: 'gross@grosser.com'
        },
    ],
    dupeReview: {
        rating: 4,
        comments: 'Hopefully no one will notice that I\'ve reviewed this restaurant already!',
        email: 'delicious@food.com'

    },

    saveRestaurant(testRest) {
        return request.post('/restaurant')
            .send(testRest)
            .then(({ body }) => {
                testRest._id = body._id;
                testRest.__v = body.__v;
                return testRest;
            })
    },
    saveReviewsArray() {
        return this.saveRestaurant(this.restaurants[0])
            .then(saved => {
                return request.post('/reviews')
                    .send({ reviews: this.reviews, restId: saved._id })
                    .then(saved => {
                        console.log('in save array: ', saved);
                        return saved;
                    })
            })
    }
}