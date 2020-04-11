import React, { Component } from 'react'
import { Circle, SemiCircle, Line } from 'react-es6-progressbar.js'
import { CircleContainer } from '../style'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class CircleChart extends Component {

    constructor(props) {
        super(props)
        let {value, target} = this.props
        this.state = {
            progress_val : (value) ? value : 0,
            target : (target) ? target : 0,
        }
    }
    
    change_progress_val(val){
        if(val !== this.state.progress_val){
            this.setState({
                progress_val : val,
            });
        }
    }

    render() {
        let { progress_val,target} = this.state;
        console.log(`The state was updated and render with progress_val : ${progress_val}`);
        return (
            <CircleContainer>
                <CircularProgressbar 
                value={progress_val} 
                maxValue={1} 
                text={`${progress_val*target}/${target}`}
                styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0,
                 
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                 
                    // Text size
                    textSize: '10px',
                 
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                 
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                 
                    // Colors
                    pathColor: `rgb(60,179,113,${progress_val})`,
                    textColor: 'rgb(60,179,113)',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                />
            </CircleContainer>
        )
    }
}

export default CircleChart
