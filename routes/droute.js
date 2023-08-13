const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dcontroller');



route.get('/', dapp.index);

//login page
route.get('/login', dapp.login);

//OPAC

route.get("/opac", dapp.opac)


module.exports = route;
