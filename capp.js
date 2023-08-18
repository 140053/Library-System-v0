const express = require("express");
const session = require('express-session');
const helmet = require("helmet");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const compression = require('compression');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const app = express();

app.use(session({
  secret: 'libman',
  resave: false,
  saveUninitialized: true
}));

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("layout", "./layouts/default");

app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(compression());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Worker Process
if (cluster.isMaster) {
  // Fork workers for each core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Routes
  app.use('/', require("./routes/droute"));
  app.use('/catalog', require("./routes/rcataloging"));
  app.use('/lsystem', require("./routes/lsystem"));
  app.use('/patron', require("./routes/patron"));
  app.use("/api", require("./routes/api"));

  app.use("*", function (req, res) {
    res.render("pages/error/notFound", {
      title: "404 Not Found",
      layout: "layouts/error"
    });
  });

  // Start server
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
