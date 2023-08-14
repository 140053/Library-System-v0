const express = require('express');
const route = express.Router();
const dapp = require('../controllers/loginsystem');



route.get('/', dapp.login);

//login page
route.get('/setup', dapp.setup);


module.exports = route;
