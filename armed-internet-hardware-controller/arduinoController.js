// Initialize Firebase
var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyCz8q6ms8i0LufyDzireMfCGUQKOcQmzQ4",
    authDomain: "arduinocommand-d9fe5.firebaseapp.com",
    databaseURL: "https://arduinocommand-d9fe5.firebaseio.com",
    projectId: "arduinocommand-d9fe5",
    storageBucket: "arduinocommand-d9fe5.appspot.com",
    messagingSenderId: "780218622646"
});

var five = require('johnny-five'); //includes module indicated by string
var board = new five.Board(); //Instantiate object class 'board' with parent 'five'

board.on('ready', function() {
    // In order for Braccio shield to run, pin 12 must output HIGH
    this.pinMode(12, 1);
    this.digitalWrite(12, 1);
    // Initialization of Servos with starting positions
    let Braccio = {
            gripper: new five.Servo({
            pin: 3,
            startAt: 73
            }),
            wrist_rot: new five.Servo({
                pin: 6,
                startAt: 0
            }),
            wrist_ver: new five.Servo({
                pin: 5,
                startAt: 170
            }),
            elbow: new five.Servo({
                pin: 9,
                startAt: 180
            }),
            shoulder: new five.Servo({
                pin: 10,
                startAt: 40
            }),
            base: new five.Servo({
                pin: 11,
                startAt: 0
            })
        }
    /* var gripper = new five.Servo({
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
    }); */

    // TODO: event function to get info from database and use it to change servo position as necessary
    function servoMovement(update) {
        Braccio.base.to(update.servos.base);
        Braccio.elbow.to(update.servos.elbow);
        Braccio.gripper.to(update.servos.gripper);
        Braccio.shoulder.to(update.servos.shoulder);
        Braccio.wrist_rot.to(update.servos.wristRot);
        Braccio.wrist_ver.to(update.servos.wristVert);
    }

    // Initialize LED variables
    let led = new five.Led(4); //Pin 13
    let power = false;
    let blink = false;

    // Function for controlling LED called by Firebase changes
    function ledSwitch(update) {
        power = update.val().ledPower;
        blink = update.val().ledBlink;
        if (power && blink) {
            led.blink(500); //500 ms interval
        }
        else if (power && !blink) {
            led.stop(); // To make sure that the blinking stops but 
            led.on();
        }
        else {
            led.stop().off(); //Will turn off the blinking LED (note that both off() and stop() are required)
        }
    }

    // Initialize Piezo Speaker, Songs, and States
    let piezo = new five.Piezo(2);

    // Function to get request from Firebase and play Piezo tune
    function playtune(update) {
        if (update.playTrack1 === true) {
            firebase.database().ref().update({
                playTrack1: false
            })
        }
        else if (update.playTrack2 === true) {
            firebase.database().ref().update({
                playTrack2: false
            })
        }
    }

    // Event function for Firebase update on value which will return the object containing the necessary information
    firebase.database().ref().on("value", function(update) {
        console.log(update);
        ledSwitch(update);
        servoMovement(update);
        playtune(update);
    }, function(error) {
        console.log("Error Code: " + error.code);
    })
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