const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dcontroller');



route.get('/', dapp.index);

module.exports = route;
