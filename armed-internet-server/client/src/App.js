import React, { Component } from 'react';
import firebase from 'firebase';
import Led from './components/led-switches';
import Servos from './components/servo-sliders';
import PiezoButtons from './components/piezo-buttons';
import './App.css';

firebase.initializeApp({
    apiKey: "AIzaSyCz8q6ms8i0LufyDzireMfCGUQKOcQmzQ4",
    authDomain: "arduinocommand-d9fe5.firebaseapp.com",
    databaseURL: "https://arduinocommand-d9fe5.firebaseio.com",
    projectId: "arduinocommand-d9fe5",
    storageBucket: "arduinocommand-d9fe5.appspot.com",
    messagingSenderId: "780218622646"
});

firebase.database().ref().set({
  servos: {
      base: 0,
      shoulder: 90,
      elbow: 90,
      wristVert: 90,
      wristRot: 90,
      gripper: 10
  },
  ledPower: false,
  ledBlink: false,
  playTrack1: false,
  playTrack2: false
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="bg-info container-fluid">
          <h1 className="text-center text-light">Arduino Commander</h1>
        </header>
        <main className="container bg-light">
          <div className="row">
            <div className="col-4">
              <Led />
            </div>
            <div className="col-4">
              <Servos />
            </div>
            <div className="col-4">
              <PiezoButtons />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;