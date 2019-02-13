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
      gripper: 90
  },
  ledPower: false,
  ledBlink: false
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="text-center">Arduino Commander</h1>
        </header>
        <main className="container">
          <Led />
          <Servos />
          <PiezoButtons />
        </main>
      </div>
    );
  }
}

export default App;