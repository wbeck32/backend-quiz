const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const pet = new Pet(req.body);
    const response = await pet.save(pet);
    res.send(response);
  })
  .get('/', async (req, res, next) => {
    const allPets = await Pet.find();
    res.send(allPets);
  })
  .get('/:type?', async (req, res, next) => {
    const { type } = req.query;
    const bird = await Pet.findOne({ type: type });
    res.send(bird);
  })
  .get('/:id', async (req, res, next) => {
    const { id } = req.query;
    const getById = await Pet.findOne({ _id: id });
    res.send(getById);
  })

module.exports = router;
