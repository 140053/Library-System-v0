"use strict";
const db = require('../models/account_mdl');
const toolbox =  require("../models/tools");
//onst indexl = require('../model/listingmodel')

//Task object constructor
var controller = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

controller.login= async function (req, res) {
  var data = req.body;
  await db.login_mdl(data, function(err, res1){
    if(err){
      res.render("pages/error/wrongpass",{
        layout: "layouts/error",
        title: "Error Wrong Password",
        sui: "",
        auth: ""
      });
    }

    if(res1){
      req.session.creds = res1;
      req.session.isLoggedIn = true;

      res.redirect('/')
    }

    
    
  });
  
};



module.exports = controller;
