const express = require('express');
const router = express.Router();
// const request = require('../../tests/helpers/request');
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const allPets = await Pet.find();
    const rave = new Rave(req.body);
    const onePet = allPets.map(pet => {
      rave.pet = new Pet(pet);
    })
    const response = await rave.save(rave);
    res.send(response);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('pet','name type -_id');
    res.send(allRaves);
  });

module.exports = router;
