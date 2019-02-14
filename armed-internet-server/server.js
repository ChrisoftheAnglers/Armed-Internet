const express = require('express');
const logger = require('morgan');
//const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env. PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Not using boilerplate, so looking for NODE_ENV won't work
app.use(express.static('client/build'));

app.use(logger('dev'));

// Connect to the Mongo DB (not used in current version)
/* mongoose.connect("mongodb://localhost/arduino", { useNewUrlParser: true }); */

// Import routes for API (currently not in use) and React build
app.use(routes);

// Start server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

