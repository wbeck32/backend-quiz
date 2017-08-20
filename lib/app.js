const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(bodyParser.json());
app.use(morgan('dev'));

const restaurant = require('./routes/routes');
app.use('/', restaurant);
app.use(errorHandler);

module.exports = app;