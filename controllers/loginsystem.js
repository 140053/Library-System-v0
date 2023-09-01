'use strict';
require('dotenv').config();
const model = require("../models/mpatron");
const pmodel = require("../models/mpatron");
//onst indexl = require('../model/listingmodel')


//Task object constructor
var controller = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


controller.login = function (req, res) {
    var object1 = req.body
    var object2 = { mode: 'in' };


    console.log(Object.keys(object1).length)

    if (Object.keys(object1).length == 3) {
        pmodel.getPatronByID(req.body, function (err, res0) {
            //console.log(res0)
            //console.log(res0)
            var status
            if (res0 == null) {
                status = false;
                res.send({ status: status });
            } else {
                status = true; // patron is registered

                pmodel.checkLastMode(object1, function (err, result0) {
                    //console.log(Object.keys(result0).length)
                    //console.log(result0)
                    var rdata

                    if (process.env.lsys_mode == 'true') {
                        // IN here
                        rdata = { ...object1, ...object2 };
                        console.log(rdata)
                        //console.log(object2)
                        pmodel.ingestPatronlog(rdata, function (err, result) {
                            if (result) {
                                res.send({ status: status, data: res0, rdata: rdata });
                            }else{
                                status = false;
                                res.send({ status: status });
                            }
                        })
                    } else {
                        if (Object.keys(result0).length > 0) {
                            // Out here
                            if (result0[0].mode == 'in' && result0[0].reg_out == null) {
                                object2 = { mode: 'out' };
                                rdata = { ...object1, ...object2 };
                                model.updateModeExit(rdata, function (err, result1) {
                                    res.send({ status: status, data: res0, rdata: rdata });
                                })
                                //console.log(rdata)
                            }
                            if (result0[0].mode == 'out') {
                                rdata = { ...object1, ...object2 };
                                //console.log(rdata)
                                //console.log(res0)
                                pmodel.ingestPatronlog(rdata, function (err, result) {
                                    if (result) {
                                        res.send({ status: status, data: res0, rdata: rdata });
                                    }
                                })
                            }
                        } else {
                            // IN here
                            rdata = { ...object1, ...object2 };
                            //console.log(rdata)
                            //console.log(res0)
                            pmodel.ingestPatronlog(rdata, function (err, result) {
                                if (result) {
                                    res.send({ status: status, data: res0, rdata: rdata });
                                }
                            })
                        }
                    }

                })
            }
        })


    } else {
        res.render('pages/loginSystem/index', {
            layout: 'layouts/lsys',
            title: 'Login System',
            sui: "",
            auth: "",
            data: ""
        });
    }






}

controller.loginMod = function (req, res) {
    var object1 = req.body
    var object2 = { mode: 'in' };


    //console.log(object1)

    if (Object.keys(object1).length == 4) {
        pmodel.getPatronByID(req.body, function (err, res0) {
            //console.log(res0)
            var status
            if (res0 == null) {
                status = false;
                res.send({ status: status });
            } else {
                status = true; // patron is registered

                pmodel.checkLastMode(object1, function (err, result0) {
                    //console.log(Object.keys(result0).length)
                    //console.log(result0)
                    var rdata

                    if (process.env.lsys_mode == 'true') {
                        // IN here
                        rdata = { ...object1, ...object2 };
                        //console.log(rdata)
                        //console.log(res0)
                        pmodel.ingestPatronlogMod(rdata, function (err, result) {
                            if (result) {
                                res.send({ status: status, data: res0, rdata: rdata });
                            }
                        })
                    } else {
                        if (Object.keys(result0).length > 0) {
                            // Out here
                            if (result0[0].mode == 'in' && result0[0].reg_out == null) {
                                object2 = { mode: 'out' };
                                rdata = { ...object1, ...object2 };
                                model.updateModeExit(rdata, function (err, result1) {
                                    res.send({ status: status, data: res0, rdata: rdata });
                                })
                                //console.log(rdata)
                            }
                            if (result0[0].mode == 'out') {
                                rdata = { ...object1, ...object2 };
                                //console.log(rdata)
                                //console.log(res0)
                                pmodel.ingestPatronlogMod(rdata, function (err, result) {
                                    if (result) {
                                        res.send({ status: status, data: res0, rdata: rdata });
                                    }
                                })
                            }
                        } else {
                            // IN here
                            rdata = { ...object1, ...object2 };
                            //console.log(rdata)
                            //console.log(res0)
                            pmodel.ingestPatronlogMod(rdata, function (err, result) {
                                if (result) {
                                    res.send({ status: status, data: res0, rdata: rdata });
                                }
                            })
                        }
                    }

                })
            }
        })


    } else {
        res.render('pages/loginSystem/logmod', {
            layout: 'layouts/lsysmod',
            title: 'Login System',
            sui: "",
            auth: "",
            data: ""
        });
    }






}

controller.setup = function (req, res) {
    res.render("pages/loginSystem/setup", {
        //layout: 'layouts/blank',
        title: 'SETUP - Login System',
        sui: "",
        auth: ""
    })
}

module.exports = controller;