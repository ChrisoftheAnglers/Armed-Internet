import React, {Component} from 'react';
import firebase from 'firebase';

class piezoButtons extends Component {
    
    render() {
        return(
            <div>
                <h3>Play a Melody</h3>
                <br></br>
                <button
                    className="btn btn-primary" 
                    onClick={() => firebase.database().ref().update({
                        playTrack1: true
                    })}
                    >…simple as can be</button>
                    <br></br>
                    <br></br>
                <button
                    className="btn btn-success" 
                    onClick={() => firebase.database().ref().update({
                        playTrack2: true
                    })}
                    >Alouette</button>
            </div>
        )
    }
}

export default piezoButtons;