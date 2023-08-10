const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dcontroller');



route.get('/', dapp.index);

//login page
route.get('/login', dapp.login);


module.exports = route;
