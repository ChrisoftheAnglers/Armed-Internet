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
    function servoMovement(data) {
        console.log(data);
        Braccio.base.to(data.servos.base);
        Braccio.elbow.to(data.servos.elbow);
        Braccio.gripper.to(data.servos.gripper);
        Braccio.shoulder.to(data.servos.shoulder);
        Braccio.wrist_rot.to(data.servos.wristRot);
        Braccio.wrist_ver.to(data.servos.wristVert);
    }

    // Initialize LED variables
    let led = new five.Led(4); //Pin 13
    let power = false;
    let blink = false;

    // Function for controlling LED called by Firebase changes
    function ledSwitch(data) {
        power = data.ledPower;
        blink = data.ledBlink;
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
        console.log(update);
        if (update.playTrack1 === true) {
            piezo.play({
                song: [
                    ["C4", 1/5],
                    ["D4", 1/5],
                    ["E4", 1/5],
                    ["G4", 1/5],
                    ["D4", 1/5]
                ],
                tempo: 50
            })
            firebase.database().ref().update({
                playTrack1: false
            })
        }
        else if (update.playTrack2 === true) {
            piezo.play({
                song: [
                    ["C4", 3/8],
                    ["D4", 1/8],
                    ["E4", 1/4],
                    ["E4", 1/4]
                ],
                tempo: 30
            })
            firebase.database().ref().update({
                playTrack2: false
            })
        }
    }

    // Event function for Firebase update on value which will return the object containing the necessary information
    firebase.database().ref().on("value", function(update) {
        console.log(update.val());
        ledSwitch(update.val());
        servoMovement(update.val());
        playtune(update.val());
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