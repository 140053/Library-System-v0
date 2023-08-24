const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dlending');
const mdl = require("../middleware/auth")



route.get('/',mdl.isLogin, dapp.index);


route.post('/lend', dapp.lend);

route.post('/save', dapp.save);





module.exports = route;
