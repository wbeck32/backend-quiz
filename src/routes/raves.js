const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const rave = req.body;
    const aPet = await Pet.findOne();
    const newRave = new Rave({comments: rave.comments, email: rave.email, pet: aPet._id})
    const savedRave = await newRave.save(newRave);
    res.send(savedRave);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('pet', 'name type -_id');
    res.send(allRaves);
  });

module.exports = router;
