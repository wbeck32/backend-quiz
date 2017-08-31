const chai = require('chai');
const assert = chai.assert;
const connect = require('../../src/connect');
const connection = require('mongoose').connection;
const req = require('../helpers/request');

describe('pet routes tests', () => {
  before(async () => {
    await connect();
    await connection.dropDatabase();
  });
  it('POST two pets of different types', async () => {}),
    it('GET /pets returns both pets', async () => {}),
    it('GET /pets?type=<one type> only returns the correct pet', async () => {}),
    it('GET /pets/:id for one of the pets returns all fields and has the two reviews', async () => {});
});
describe('rave routes tests', () => {
  it('POST two raves from one user email to both of the pets', async () => {}),
    it('POST two raves from another user email to both of the pets', async () => {}),
    it('GET /raves returns all four raves (2 per pet) plus pet name & type', async () => {});
});