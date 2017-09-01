const chai = require('chai');
const assert = chai.assert;
const connect = require('../../src/connect');
const connection = require('mongoose').connection;
const req = require('../helpers/request');
let {
  birdPet,
  fishPet,
  raveOne,
  raveTwo,
  raveThree,
  raveFour
} = require('../helpers/test-helper');

describe('pet routes tests', () => {
  before(async () => {
    await connect();
    await connection.dropDatabase();
  });
  it('POST two pets of different types', async () => {
    const postBird = await req.post('/pet').send(birdPet);
    const postFish = await req.post('/pet').send(fishPet);
    assert.equal(postBird.status, 200);
    assert.equal(postFish.body.name, 'Wallace');
  }),
    it('GET /pets returns both pets', async () => {
      const allPets = await req.get('/pets');
      assert.equal(allPets.body.length, 2);
      assert.equal(allPets.status, 200);
    }),
    it('GET /pets?type=<one type> only returns the correct pet', async () => {
      const getBird = await req.get('/pets').query({ type: 'bird' });
      assert.equal(getBird.status, 200);
    });
});
describe('rave routes tests', () => {
  it('POST two raves from one user email to both of the pets', async () => {
    const savedRaveOne = await req.post('/raves').send(raveOne);
    const savedRaveTwo = await req.post('/raves').send(raveTwo);
    assert.equal(savedRaveOne.body.email,'pet@petme.com');
    assert.hasAllKeys(savedRaveTwo.body, ['__v', '_id', 'comments', 'email', 'pet']);
  }),
    it('POST two raves from another user email to both of the pets', async () => {
      // const birdRaveOne = await req.post('/raves').send(raveThree);
      // const birdRaveTwo = await req.post('/raves').send(raveFour);
    }),
    it('GET /raves returns all four raves (2 per pet) plus pet name & type', async () => {
      const getRaves = await req.get('/raves');
      // console.log('getRaves: ', getRaves)
    }),
    it('GET /pets/:id for one of the pets returns all fields and has the two raves', async () => {});
});
