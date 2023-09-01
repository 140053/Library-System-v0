"use strict";
const db = require('../models/mpatron');
const toolbox =  require("../models/tools");
//onst indexl = require('../model/listingmodel')

//Task object constructor
var controller = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

controller.patronToday = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronToday(function(err, result){
   //console.log(result)
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result
        })
   })
    
}
controller.patronMonth = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronMonth(function(err, result){
   //console.log(result)
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result
        })
   })
    
}

controller.patronLMonth = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronLMonth(function(err, result){
   //console.log(result)
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result
        })
   })
    
}

controller.patronByFloor = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronLC(function(err, result){
   //console.log(result)
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result
        })
   })
    
}

controller.patronToday_api = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronToday(function(err, result){ 
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }
        const response = {
            draw: 1, // Increment this for each request if using pagination
            recordsTotal: result.length, // Total number of records before filtering
            recordsFiltered: result.length, // Total number of records after filtering (assuming no filtering)
            data: result.map((row) => [
                row.id,
                row.pid,
                row.campus,
                row.section,
                row.mode,
                row.reg_in,
                row.modeOut,
                row.reg_out
            ])
        };
        console.log(response)

        res.setHeader('Content-Type', 'application/json');
        res.json(response);
   })
    
}


module.exports = controller;
