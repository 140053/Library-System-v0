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
  res.render("pages/index", {
    title: "Home",
    sui: "",
    auth: "",
  });
};

controller.login = function (req, res) {
  res.render("pages/login", {
    layout: "layouts/blank",
    title: "Home",
    sui: "",
    auth: "",
  });
};


controller.opac = function(req, res){
  res.render("pages/opac/opac", {
    layout: "layouts/blank",
    title: "OPAC",
    sui: "",
    auth: "",
  });
}

module.exports = controller;
