// app.js

const express = require('express');
const helmet = require('helmet');
const path = require('path');
//const csurf = require('csurf');
const expressLayouts = require('express-ejs-layouts');
//const loggerMiddleware = require('./middlewares/logger');
const compression = require('compression');
const knex = require('knex');
//const knexConfig = require('./knexfile');

const app = express();
//const db = knex(knexConfig.development);

// Configuration
require('dotenv').config(); // Load environment variables from .env
const PORT = process.env.PORT || 3000;

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/default')

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use('/assets',express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
//app.use(loggerMiddleware);
app.use(compression()); // Gzip compression
//app.use(csurf({ cookie: true })); // CSRF protection

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require("./routes/droute"));
app.use('/catalog', require("./routes/rcataloging"));



//for none existed route
app.use('*',function(req,res){
    res.send("Not Found")
  })



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
