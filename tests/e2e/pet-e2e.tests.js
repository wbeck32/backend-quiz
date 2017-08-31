const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
require('dotenv').config();
const dbUri = process.env.MONGO_URI;
const connect = require('../../lib/connect');
const mongoose = require('mongoose');
const testHelper = require('../helpers/test-helper');
const req = require('../helpers/request');