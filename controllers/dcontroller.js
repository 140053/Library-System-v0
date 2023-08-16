"use strict";
//const kmodel = require('../model/appModel');
//onst indexl = require('../model/listingmodel')


//Task object constructor
var controller = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

controller.index = function (req, res) {
  var creds = req.session.creds
 
  res.render("pages/index", {
    title: "Home",
    sui: creds,
    auth: "",
  });
};

controller.login = function (req, res) {
  res.render("pages/login", {
    layout: "layouts/login",
    title: "Login",
    sui: "",
    auth: "",
  });
};

controller.register = function(req, res){
  res.render("pages/register", {
    layout: "layouts/login",
    title: "Register",
    sui: "",
    auth: "",
  });
}


controller.opac = function(req, res){
  res.render("pages/opac/opac", {
    layout: "layouts/blank",
    title: "OPAC",
    sui: "",
    auth: "",
  });
}

controller.signout = function(req, res){
  delete req.session.creds;
  delete  req.session.isLoggedIn;
  res.redirect('/login');
  //console.log('Sign out');
}

module.exports = controller;
