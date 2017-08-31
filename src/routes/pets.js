const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
.post('/', async (req, res, next) => {
  const pet = new Pet(req.body);
  const response = await pet.save(pet);
  res.send(response);
})
.get('/', async (req, res, next) => {
  const allPets = await Pet.find()
  res.send(allPets)

})



.use(jsonParser);

module.exports = router;