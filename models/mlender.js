require("dotenv").config();
const knex = require("knex");
const config = require("../database/knexfile");
const toolbox = require("./tools");

const environment = "development"; // Change this based on your environment
const db = knex(config[environment]);

//Task object constructor
var model = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

//Return item borrowed

model.returnBorrow = function (data, result) {
  var val = data;
  db("libman_lendTrans")
    .where({
      tcode: val.id,
      idnum: val.uid,
    })
    .update({
      action: "return",
    })
    .then(function (resp) {
      result(null, true);
    });
};

model.returnBorrowBYID = function (data, result) {
  var data = data;
  db("libman_lendTrans")
    .where({
      tcode: data.id,
      action: "borrow",
    })
    .whereNull("reg_return")
    .update({
      action: "return",
    })
    .then(function (resp) {
      result(null, true);
    });
};

//delete items by id

model.delByID = function (id, result) {
  db("libman_boardgames")
    .where("code", id)
    .del()
    .then(function (resp) {
      result(null, true);
    });
};

//get list of borrowed boardgames
model.getBoardgames = function (location, result) {
  if (location == "lc") {
    db("libman_lendTrans")
      .where("action", "borrow")
      .whereRaw("tname != ?", ["key"])
      .andWhere("location", "lc")
      .whereNull("reg_return")
      .then(function (resp) {
        result(null, resp);
      });
  }
  if (location == "sc") {
    db("libman_lendTrans")
      .where("action", "borrow")
      .whereRaw("tname != ?", ["key"])
      .andWhere("location", "sc")
      .whereNull("reg_return")
      .then(function (resp) {
        result(null, resp);
      });
  }
};

//get list of borrowed Locker
model.getBoardgames1 = function (result) {
  db("libman_lendTrans")
    .where("action", "borrow")
    .whereRaw("tname = ?", ["key"])
    .whereNull("reg_return")
    .then(function (resp) {
      result(null, resp);
    });
};

//get list of  boardgames
model.getAllBoardgames = function (result) {
  db("libman_boardgames").then(function (resp) {
    result(null, resp);
  });
};

//Add item model
model.addBoardgames = function (data, result) {
  db("libman_boardgames")
    .insert({
      code: data.code,
      name: data.name,
      type: data.type,
      status: "true",
    })
    .then(function (res) {
      result(null, res);
    });
};

//getpatron
model.getpatronbyIDTotaday = function (id, result) {
  var dt = new Date();
  var datemonth2 =
    dt.getFullYear() +
    "-" +
    ("0" + (dt.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dt.getDate()).slice(-2) +
    "%";
  db("libman_patronlog")
    .join("libman_patron", "libman_patronlog.pid", "=", "libman_patron.IDnum")
    .select("libman_patron.IDnum", "libman_patron.name")
    .where("libman_patronlog.pid", id)
    .andWhere("reg_in", "like", datemonth2)
    .whereNull("reg_out")
    .limit(1)
    .then(function (resp) {
      result(null, resp);
    });
};

model.ingestTransaction = function (data,location, result) {
  db("libman_lendTrans")
    .insert({
      idnum: data.idnum,
      action: data.action,
      type: data.type,
      tname: data.tname,
      tcode: data.tcode,
      location: location
    })
    .then(function (resp) {
      result(null, resp);
    });
};

model.checkBoardGames = function (code, result) {
  db("libman_boardgames")
    .where("code", code)
    .limit(1)
    .then(function (resp) {
      result(null, resp);
    });
};

module.exports = model;
