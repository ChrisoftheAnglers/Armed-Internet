// Dependencies
var mongoose = require("mongoose");

// Create Schema and model for export
var arduinoSchema = new mongoose.Schema({
    servos: [Number],
    speaker: {
        notes: String,
        timings: [Number]
    },
    led: {
        // Be sure to check BOTH of these values in listening controller
        on: Boolean,
        blink: Boolean
    }
});

var Arduino = mongoose.model("Arduino", arduinoSchema);
module.exports = Arduino;