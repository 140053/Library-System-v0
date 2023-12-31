const express = require('express');
const route = express.Router();
const dapp = require('../controllers/loginsystem');



route.get('/', dapp.login);
route.post('/', dapp.login);



//mod login
route.get("/mod", dapp.loginMod);
route.post("/mod", dapp.loginMod);


//login page
route.get('/setup', dapp.setup);


module.exports = route;
