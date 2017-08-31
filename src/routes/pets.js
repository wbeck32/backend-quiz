const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

router

.post('/', jsonParser, (req, res, next) => {

})



.use(jsonParser);

module.exports = router;