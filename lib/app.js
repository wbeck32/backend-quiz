const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(bodyParser.json());
app.use(morgan('dev'));

const pets = require('./routes/pets');
const raves = require('./routes/raves');

app.use('/pet', pets);
app.use('/pets', pets);
app.use('/raves', raves);

app.use(errorHandler);

module.exports = app;