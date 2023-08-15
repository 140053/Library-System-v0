'use strict';
//const kmodel = require('../model/appModel');
//onst indexl = require('../model/listingmodel')


//Task object constructor
var controller = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


controller.add = function(req, res){    
    res.render('pages/patron/add',{
        //layout: 'layouts/lsys',
        title: 'Add Patron',
        sui:"",
        auth: ""
    });
}

controller.list = function(req, res){
    res.render("pages/patron/list", {
        //layout: 'layouts/blank',
        title: 'Patron List',
        sui:"",
        auth: ""
    })
}

module.exports = controller;