const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
  .get('/:id', async (req, res, next) => {
    let { id } = req.params;
    const getById = await Pet.findOne({ _id: id });
    getById_id = mongoose.Types.ObjectId(getById._id);
    const raves = await Rave.find({pet: getById_id});
    res.send(raves);
  })
  .get('/:type?', async (req, res, next) => {
    const { type } = req.query;
    const bird = await Pet.findOne({ type: type });
    res.send(bird);
  })


module.exports = router;
