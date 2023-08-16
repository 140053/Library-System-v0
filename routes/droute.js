const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dcontroller');
const mdl = require("../middleware/auth")



route.get('/', mdl.isLogin, dapp.index);

//login page
route.get('/login', dapp.login);
//register
route.get('/register', dapp.register);



//OPAC
route.get("/opac", dapp.opac)


//Signout 
route.get("/signout", dapp.signout);


module.exports = route;
