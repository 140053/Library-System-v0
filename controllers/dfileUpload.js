"use strict";

  

//Task object constructor
var controller = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

controller.patron= function (req, res) {
  res.send('Send');
};



module.exports = controller;
