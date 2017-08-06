const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(bodyParser.json());
app.use(morgan('dev'));


const restaurants = require('./routes/restaurant-routes');
app.use('/', restaurants);
app.use(errorHandler);

module.exports = app;