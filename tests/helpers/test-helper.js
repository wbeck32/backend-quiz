const request = require('./request');

module.exports = {

    restaurantA: {
        name: 'Food Coma',
        address: {
            street: 'Main Street',
            city: 'Any City'
        },
        cuisine: 'other',
        reviews: []
    },

    restaurantB: {
        name: 'Next Door to Food Coma',
        address: {
            street: 'Main Street',
            city: 'Any City'
        },
        cuisine: 'comfort',
        reviews: []
    },
    restaurantC: {
        name: 'Yama',
        address: {
            street: 'NW 11th Avenue',
            city: 'Portland'
        },
        cuisine: 'euro',
        reviews: []
    },


    review: {
        rating: 5,
        comments: 'Our waiter...was determined to gaslight us into thinking we were having a good time. “Trump gets the taco bowl and the lasagna and baked ziti,” he said, before subsequently informing the table that we could not order the lasagna or baked ziti.@@@@@@@',
        email: 'LOWERCASE@GMAIL.COM'
    },
    saveRestaurant(testRestaurant) {
        return request.post('/restaurant')
            .send(testRestaurant)
            .then(({ body }) => {
                testRestaurant._id = body._id;
                testRestaurant.__v = body.__v;
                return testRestaurant;
            })
    },
    saveTwoRestaurants(testRestaurantA, testRestaurantB) {
        return Promise.all([
                this.saveRestaurant(testRestaurantA)
                .then(restaurant => testRestaurantA = restaurant),
                this.saveRestaurant(testRestaurantB)
                .then(restaurant => testRestaurantB = restaurant)
            ])
            .then(two => {
                return two;
            })
    }
}