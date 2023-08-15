const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dpatron');



route.get('/add', dapp.add);

//login page
route.get('/list', dapp.list);


module.exports = route;
