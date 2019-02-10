var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var port = 3001;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(logger('dev'));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/arduino", { useNewUrlParser: true });

// Import routes
app.use('/api/arduino', require('./controllers/arduinoRoutes.js'));

// Start server
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
