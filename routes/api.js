const express = require('express');
const route = express.Router();
const account = require("../controllers/daccount");
const patron = require("../controllers/dreports");
const mdl = require("../middleware/auth")



route.post('/login', account.login);


route.post('/getLogby', patron.patronToday_api)



module.exports = route;
