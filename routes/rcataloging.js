const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dcataloging');


//Books
route.get('/book', dapp.index);

//Add
route.get('/book/add', dapp.add);




module.exports = route;
