const express = require("express");
const route = express.Router();
const account = require("../controllers/daccount");
const patron = require("../controllers/dreports");
const mdl = require("../middleware/auth");

route.post("/login", account.login);

route.post("/getLogby", patron.patronToday_api);

route.post("/bycourse", patron.apiGetCourseReport);

route.post("/bySection", patron.apiGetCourseReportSec);

route.post("/byGenderAll", patron.apiGetGenderAll);

route.post("/byUsertype", patron.apiGetUserClassAll);

route.post("/genderbyCourse", patron.apiGetGenderBycourseAll);

route.post("/genderbySection", patron.apiGetGenderBycourseSect);

module.exports = route;
