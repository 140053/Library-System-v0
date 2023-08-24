"use strict";
const lendModel = require('../models/mlender');
//onst indexl = require('../model/listingmodel')


//Task object constructor
var controller = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

controller.index = function (req, res) {
    var creds = req.session.creds
    if(!creds){ res.redirect("/")}
    lendModel.getBoardgames(function (err, res0) {
        res.render("pages/lending/index", {
            title: "Home",
            sui: creds,
            auth: "",
            lender: res0,
            data: [],
            sts:false
        });
    })
};
controller.locker = function (req, res) {
    var creds = req.session.creds
    if(!creds){ res.redirect("/")}
    lendModel.getBoardgames1(function (err, res0) {
        res.render("pages/lending/index", {
            title: "Home",
            sui: creds,
            auth: "",
            lender: res0,
            data: [],
            sts:false
        });
    })
};

controller.save = function (req, res) {
    var data = req.body;
    lendModel.checkBoardGames(data.tcode, function (err, result0) {
        var cnt = Object.keys(result0).length;
        if (cnt == 1) {
            lendModel.ingestTransaction(data, function (err, result) {
                if (!result || err) {
                    res.send({ error: "Error in saving" })
                } else {
                    res.redirect('/lending/');
                }
            })
        } else {
            res.send("<center ><h1 style='margin-top:150px; color:red;'>Board Games Not Founds in Record </h1> <br> <hr> <a href='/lending'>Click here to go back.</a></center>")
        }
    })
}

controller.lend = function (req, res) {
    var creds = req.session.creds
    if(!creds){ res.redirect("/")}
    var id = req.body.id;
    var type = req.body.type;
    if (type == 'SID') {
        lendModel.getpatronbyIDTotaday(id, function (err, result) {
            console.log(result)
            res.render("pages/lending/index", {
                title: "Home",
                sui: creds,
                auth: "",
                lender: [],
                data: result,
                sts: true
            });
        })
    }else{
        //return 
        res.render("pages/lending/index", {
            title: "Lending Master",
            sui: creds,
            auth: "",
            lender: [],
            data: [],
            sts:false
        });

    }
}

controller.listItem = function (req, res){
    var creds = req.session.creds
    if(!creds){ res.redirect("/")}
    lendModel.getAllBoardgames(function(err, res0){
        res.render("pages/lending/items", {
            title: "Item - Lending Master",
            sui: creds,
            auth: "",
            lender: [],
            data: res0
        });
    })
    
}


//handle add items

controller.addItem = function (req, res) {
    var creds = req.session.creds
    if(!creds){ res.redirect("/")}
    var data = req.body;
    console.log(data)
    lendModel.addBoardgames(data, function(err, res0){
        res.redirect('/lending/items')
    })
    
}





module.exports = controller;
