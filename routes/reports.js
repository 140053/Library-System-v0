const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dreports');




route.get('/patron/today', dapp.patronToday);

route.get('/patron/month', dapp.patronMonth);



module.exports = route;
