// app.js

const express = require("express");
const session = require('express-session');
//const helmet = require("helmet");
const path = require("path");
//const csurf = require('csurf');
const expressLayouts = require("express-ejs-layouts");
const mdl = require('./middleware/auth');

//const compression = require('compression');
const knex = require('knex');
const { route } = require('./routes/lsystem');

const multer = require('multer');
//const knexConfig = require('./knexfile');

const app = express();
//const db = knex(knexConfig.development);

 // Use a cookie parsing middleware
//session 
app.use(session({
  secret: 'libman',
  resave: false,
  saveUninitialized: true
}));

// Configuration
require("dotenv").config(); // Load environment variables from .env
const PORT = process.env.PORT || 3000;

//templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/default");

// Middleware
app.use(express.urlencoded({ extended: true }));
//app.use(csurf({ cookie: true })); // CSRF protection
app.use("/assets", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
////app.use(helmet());
//app.use(loggerMiddleware);
//app.use(compression()); // Gzip compression


// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes


app.use('/', require("./routes/droute"));

//cataloging1
app.use('/catalog', require("./routes/rcataloging"));
//login system
app.use('/lsystem', require("./routes/lsystem"));
//patron 
app.use('/patron', require("./routes/patron"));
//lending 
app.use('/lending', require("./routes/lending"));





//file Upload 
app.use("/file", require("./routes/fileUpload"));

//api 
app.use("/api", require("./routes/api"));

//for none existed route
app.use("*", function (req, res) {
  res.render("pages/error/notFound", {
    title:"404 Not Found" ,
    layout :"layouts/error"
  })
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
