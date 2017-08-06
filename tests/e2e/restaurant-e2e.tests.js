const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const testHelper = require('../helpers/test-helper');

describe('restaurant API', () => {
    const req = chai.request(app);

    let testRestaurant = testHelper.restaurant;
    let testReview = testHelper.review;

    it('POST /restaurant', () => {
        return req.post('/restaurant')
            .send(testRestaurant)
            .then(res => {
                console.log('success: ', res.body);
            })
    })
})



//   * POST two restaurants, each of a different type of cuisine
//   * **Test** that `GET` `/restaurants` returns both restaurants
//   * **Test** that `GET` `/restaurants?cuisine=<one of the cuisines>` only returns one of the restaurants
//   * POST three reviews from three different user emails to one of the restaurants
//   * POST a fourth review from one of the same emails, **Test** that 400 returned.
//   * **Test** that `GET` `/restaurants/:id` for that restaurant has the three reviews