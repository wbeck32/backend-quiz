const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const rave = new Rave(req.body);
    const allPets = await Pet.find();
    allPets.map(pet => {
      rave.pet = pet._id;
      return rave;
    });
    const response = await rave.save();
    res.send(response);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('name', 'type');
    // console.log('allRaves: ', allRaves.body);
    res.send(allRaves);
  });

module.exports = router;
