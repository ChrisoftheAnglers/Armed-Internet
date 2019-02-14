import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import firebase from 'firebase';

class Switches extends Component {
    state = {
        checkedPower: false,
        checkedBlink: false
    };

    handleChange = name => event => {
        // Set state is asynchronous, so any function that occurs
        // AFTERWORDS should be set as a callback or promise
        this.setState({[name]: event.target.checked},
            () => {
                firebase.database().ref().update({
                    ledPower: this.state.checkedPower,
                    ledBlink: this.state.checkedBlink
                })
            });
    };

    render() {
        return (
            <div>
                <h3>Led Switches</h3>
                <Switch 
                    checked = {this.state.checkedPower}
                    onChange = {this.handleChange('checkedPower')}
                    value = "checkedPower"
                    color = "primary"
                /><span>Power</span>
                <Switch 
                    checked = {this.state.checkedBlink}
                    onChange = {this.handleChange('checkedBlink')}
                    value = 'checkedBlink'
                    color = 'secondary'
                /><span>Blink</span>
            </div>
        )
    }
}

export default Switches;