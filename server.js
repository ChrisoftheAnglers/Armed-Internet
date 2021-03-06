const express = require('express');
//const logger = require('morgan');
//const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using boilerplate
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}
// Connect to the Mongo DB (not used in current version)
/* mongoose.connect("mongodb://localhost/arduino", { useNewUrlParser: true }); */

// Import routes for API (currently not in use) and React build
app.use(routes);

// Start server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

