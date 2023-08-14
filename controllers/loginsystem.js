'use strict';
//const kmodel = require('../model/appModel');
//onst indexl = require('../model/listingmodel')


//Task object constructor
var controller = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


controller.login = function(req, res){    
    res.render('pages/loginSystem/index',{
        layout: 'layouts/lsys',
        title: 'Login System',
        sui:"",
        auth: ""
    });
}

controller.setup = function(req, res){
    res.render("pages/loginSystem/setup", {
        //layout: 'layouts/blank',
        title: 'SETUP - Login System',
        sui:"",
        auth: ""
    })
}

module.exports = controller;