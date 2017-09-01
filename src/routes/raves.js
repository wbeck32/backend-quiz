const express = require('express');
const router = express.Router();
const Pet = require('../models/');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const rave = req.body.rave;
    const type = req.body.type;
    const aPet = await Pet.findOne({'type': type});
    const newRave = new Rave({comments: rave.comments, email: rave.email, pet: aPet._id})
    const savedRave = await newRave.save(newRave);
    res.send(savedRave);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('pet', 'name type -_id');
    res.send(allRaves);
  });

module.exports = router;
