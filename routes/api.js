const express = require('express');
const route = express.Router();
const account = require("../controllers/daccount")
const mdl = require("../middleware/auth")



route.post('/login', account.login);



module.exports = route;
