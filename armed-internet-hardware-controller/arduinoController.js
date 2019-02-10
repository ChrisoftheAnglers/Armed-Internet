/* // Initialize Firebase
var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyDQefq8pw-Exyooa_N2wh27fzA3v1LV1IE",
    authDomain: "arduino-control-testing.firebaseapp.com",
    databaseURL: "https://arduino-control-testing.firebaseio.com",
    projectId: "arduino-control-testing",
    storageBucket: "arduino-control-testing.appspot.com",
    messagingSenderId: "493184510884"
});

firebase.auth().signInAnonymously().catch(function(error) {
    console.log("Error Code: " + error.code);
}) */

var five = require('johnny-five'); //includes module indicated by string
var board = new five.Board(); //Instantiate object class 'board' with parent 'five'

board.on('ready', function() {
    // In order for Braccio shield to run, pin 12 must output HIGH
    this.pinMode(12, 1);
    this.digitalWrite(12, 1);
    // Initialization of Servos with starting positions
    var gripper = new five.Servo({
        pin: 3,
        startAt: 73
    });
    var wrist_rot = new five.Servo({
        pin: 6,
        startAt: 0
    });
    var wrist_ver = new five.Servo({
        pin: 5,
        startAt: 170
    });
    var elbow = new five.Servo({
        pin: 9,
        startAt: 180
    });
    var shoulder = new five.Servo({
        pin: 10,
        startAt: 40
    });
    var base = new five.Servo({
        pin: 11,
        startAt: 0
    });

    // TODO: event function to get info from database and use it to change servo position as necessary
    

    /* base.center();
    shoulder.center();
    elbow.center();
    wrist_rot.center();
    wrist_ver.center();
    gripper.center(); */

    /* var led = new five.Led(13); //Pin 13
    led.blink(500); //500 ms interval
    on = true; //Set on to true
    firebase.database().ref().set({
        on: on
    })
    //This is nested inside board.on because led objects (and others) WILL NOT INITIALIZE PROPERLY UNTIL board.on
    //'ready' occurs (probably to prevent signals from being sent to the Arduino board before it is can accept them)
    firebase.database().ref().on("value", function(update) {
        console.log(update);
        on = update.val().on;
        if (on) {
            led.blink(500); //500 ms interval
        }
        else {
            led.stop().off(); //Will turn off the blinking LED (note that both off() and stop() are required)
        }
    }, function(error) {
        console.log("Error Code: " + error.code);
    }) */
})

/* firebase.database().ref().on("value", function(update) {
    console.log(update);
    on = update.val().on;
    if (on) {
        led.blink(500); //500 ms interval
    }
    else {
        led.stop().off(); //Will turn off the blinking LED (note that both off() and stop() are required)
    }
}, function(error) {
    console.log("Error Code: " + error.code);
}) */