import React from 'react';
import firebase from 'firebase';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = {
    root: {
        width: 250
    },
    slider: {
        padding: '15px 0px'
    }
};

class StepSliders extends React.Component {
    state = {
        base: 0,
        shoulder: 90,
        elbow: 90,
        wristVert: 90,
        wristRot: 90,
        gripper: 90
    };

    handleChange = name => (event, value) => {
        this.setState({[name]: value},
            () => console.log(this.state));
    };

    // This will write our value to Firebase
    handleDragStop = name => (event, value) => {
        console.log(this.state);
        firebase.database().ref().update({
            servos: this.state
        });
    }

    render() {
        const {classes} = this.props;
        const {base, shoulder, elbow, wristVert, wristRot, gripper} = this.state;

        return (
            <div className = {classes.root}>
                <Typography id = "base">Base</Typography>
                <Slider 
                    classes = {{container: classes.slider}}
                    value = {base}
                    aria-labelledby = "base"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("base")}
                    onDragEnd = {this.handleDragStop("base")}
                />
                <Typography id = "shoulder">Shoulder</Typography>
                <Slider
                    classes = {{container: classes.slider}}
                    value = {shoulder}
                    aria-labelledby = "shoulder"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("shoulder")}
                    onDragEnd = {this.handleDragStop("shoulder")}
                />
                <Typography id = "elbow">Elbow</Typography>
                <Slider 
                    classes = {{container: classes.slider}}
                    value = {elbow}
                    aria-labelledby = "elbow"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("elbow")}
                    onDragEnd = {this.handleDragStop("elbow")}
                />
                <Typography id = "wristVert">Wrist (vertical)</Typography>
                <Slider 
                    classes = {{container: classes.slider}}
                    value = {wristVert}
                    aria-labelledby = "wristVert"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("wristVert")}
                    onDragEnd = {this.handleDragStop("wristVert")}
                />
                <Typography id = "wristRot">Wrist Rotation</Typography>
                <Slider 
                    classes = {{container: classes.slider}}
                    value = {wristRot}
                    aria-labelledby = "wristRot"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("wristRot")}
                    onDragEnd = {this.handleDragStop("wristRot")}
                />
                <Typography id = "gripper">Gripper</Typography>
                <Slider 
                    classes = {{container: classes.slider}}
                    value = {gripper}
                    aria-labelledby = "gripper"
                    min = {0}
                    max = {180}
                    step = {1}
                    onChange = {this.handleChange("gripper")}
                    onDragEnd = {this.handleDragStop("gripper")}
                />
            </div>
        );
    }
}

StepSliders.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StepSliders);