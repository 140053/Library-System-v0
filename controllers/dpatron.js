'use strict';
const pmodel = require('../models/mpatron');
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
    pmodel.listPatron(function(err, result){
        //console.log(result[0].name)
        res.render("pages/patron/list", {
            //layout: 'layouts/blank',
            title: 'Patron List',
            sui:"",
            auth: "",
            data: result
        })
    })
   
}

controller.importCSV = function(req, res){
    res.send(req.body)

    /*
    pmodel.importCSV('PATRON TEMPLATE.csv', function(err, result){
        if(err){
            res.send(err);
        }
        if(result){
            res.redirect('/patron/list');
        }
       
    })
    */
}

module.exports = controller;