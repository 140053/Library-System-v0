require('dotenv').config();
const knex = require('knex');
const config = require('../database/knexfile');
const toolbox = require('./tools');

const environment = 'development'; // Change this based on your environment
const db = knex(config[environment]);

//Task object constructor
var model = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


//get list of borrowed boardgames
model.getBoardgames = function(result){
    db("libman_lendTrans")
    .where('action', 'borrow')
    .whereNull("reg_return")
    .then(function(resp) {
        result(null, resp)
    });
}


//getpatron
model.getpatronbyIDTotaday = function (id, result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    db('libman_patronlog')
        .join("libman_patron", "libman_patronlog.pid", "=", "libman_patron.IDnum")
        .select("libman_patron.IDnum", "libman_patron.name")
        .where('libman_patronlog.pid',id)
        .andWhere('reg_in', 'like', datemonth2)
        .whereNull("reg_out")
        .limit(1)
        .then(function(resp) {
            result(null, resp)
        });

}

model.ingestTransaction = function(data, result){
    db("libman_lendTrans")
    .insert({
        idnum: data.idnum,
        action: data.action,
        type: data.type,
        tname: data.tname,
        tcode: data.tcode
    })
    .then(function(resp) {
        result(null, resp)
    });
}

model.checkBoardGames = function(code, result){
    db("libman_boardgames")
    .where("code", code)
    .limit(1)
    .then(function(resp) {
        result(null, resp)
    });
}




module.exports= model;