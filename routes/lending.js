const express = require('express');
const route = express.Router();
const dapp = require('../controllers/dlending');
const mdl = require("../middleware/auth")


//transaction page
route.get('/',mdl.isLogin, dapp.index);

route.get('/slend',mdl.isLogin, dapp.SerialsLend);

//hanlde transaction request
route.post('/lend', dapp.lend);

route.post('/lendlock', dapp.lendlock);

route.post('/save', dapp.save);
route.post('/savel', dapp.savel);

//Locker 
route.get('/locker',mdl.isLogin, dapp.locker);

//list of items 
route.get("/items", dapp.listItem);
//add item
route.post("/add", dapp.addItem);
route.get("/del/:id", dapp.delItem)
route.get("/return/:id/:uid", dapp.returnItem)





module.exports = route;
