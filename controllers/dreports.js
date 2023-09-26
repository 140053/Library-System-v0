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



//Repport

controller.apiGetCourseReport = function(req, res){
    db.getreportByCourse(function(err, result){

        const course = result.filter(item => item.Degree_Course).map(item => item.Degree_Course); 
        
        const count = result.map(item => item.cnt); 

        //console.log('course =', course);
        //console.log('count =', count);
       
        res.send([course, count])
    })
}


controller.apiGetCourseReportSec = function(req, res){
    var section = req.body.section;
    db.getreportBySection(section, function(err, result){
        //console.log(result[0]);
       
        const course = result[0].map(item => item.Degree_Course);
        //console.log(course);
        const count = result[0].map(item => item.cnt);
        //console.log(count); 

       res.send([course, count])
        //res.send(course)
    })
   
}

controller.apiGetGenderAll = function(req, res){
    var section = req.body.section;
    db.getreportByGender(section, function(err, result){
        //console.log(result[0])
        res.send(result);
    })
}

controller.apiGetUserClassAll = function(req, res){   
    db.getreportByUserClass(function(err, result){
        //console.log(result[0])
        res.send(result);
    })
}


controller.apiGetGenderBycourse = function(req, res){
    db.getGenderByCourseMale(function(err1, res1){
        db.getGenderByCourseFemale(function(err2, res2){
            if (err1 || err2 ){
                res.send([]);            
            }else{
                //male
                var lm = res1[0].map(item => item.male);
                var cnt_m = res1[0].map(item => item.cnt);
                //female
                var lf = res2[0].map(item => item.female);
                var cnt_f = res2[0].map(item => item.cnt);
                res.send([lm, cnt_m, lf, cnt_f ])
            }
        })
    })
}

controller.apiGetGenderBycourseAll = function(req, res){
    db.getGenderByCourseAll(function(err1, res1){
       res.send(res1)
    })
}

controller.apiGetGenderBycourseSect = function(req, res){
    var sect = req.body.section;
    db.getGenderByCourseSect(sect, function(err1, res1){
       res.send(res1)
    })
}




controller.patronToday = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronToday(function(err, result){
   //console.log(result)
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result[0]
        })
   })
    
}
controller.patronMonth = function(req, res ){
    //var creds = req.session.creds
   // if(!creds){ res.redirect("/")}
   db.getPatronMonth(function(err, result){
   console.log(result[0])
        res.render("pages/reports/patron-today",{
            title: "Patron Reports Today",
            sui: "", //creds,
            auth: "",
            data: result[0]
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
