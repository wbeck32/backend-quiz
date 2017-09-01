const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const rave = new Rave(req.body);
    const allPets = await Pet.find();
    // console.log('allPets: ', allPets[0], typeof allPets)
    // console.log('keys: ',Object.values(allPets), Object.keys(allPets));
    allPets.map(pet => {
      console.log('rave: ', rave);

      console.log('pet: ', pet)
      rave.pet = pet._id;
      const response = await rave.save(rave);

    })
    // const response = await rave.save(rave);
    res.send(response);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('name','type');
    console.log('allRaves: ', allRaves.body)
    res.send(allRaves);
  });

module.exports = router;
