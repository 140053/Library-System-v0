const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dreports');




route.get('/patron/today', dapp.patronToday);

route.get('/patron/month', dapp.patronMonth);
route.get('/patron/lmonth', dapp.patronLMonth);

route.get('/patron/lc', dapp.patronByFloor);



module.exports = route;
