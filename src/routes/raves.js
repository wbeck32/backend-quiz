const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Rave = require('../models/Rave');

router
  .post('/', async (req, res, next) => {
    const rave = new Rave(req.body);
    const response = await rave.save(rave);
    res.send(response);
  })
  .get('/', async (req, res, next) => {
    const allRaves = await Rave.find().populate('name','type');
    res.send(allRaves);
  });

module.exports = router;
