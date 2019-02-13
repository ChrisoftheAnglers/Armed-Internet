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
                console.log(this.state);
                firebase.database().ref().update({
                    ledPower: this.state.checkedPower,
                    ledBlink: this.state.checkedBlink
                })
            });
    };

    render() {
        return (
            <div>
                <Switch 
                    checked = {this.state.checkedPower}
                    onChange = {this.handleChange('checkedPower')}
                    value = "checkedPower"
                    color = "primary"
                />
                <Switch 
                    checked = {this.state.checkedBlink}
                    onChange = {this.handleChange('checkedBlink')}
                    value = 'checkedBlink'
                    color = 'secondary'
                />
            </div>
        )
    }
}

export default Switches;