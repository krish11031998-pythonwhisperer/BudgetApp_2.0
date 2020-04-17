import React, { Component } from 'react'
import { Circle, SemiCircle, Line } from 'react-es6-progressbar.js'
import { CircleContainer } from '../style'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Progress } from 'antd'
import 'antd/dist/antd.css'
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
                <div className="chartcontainer right">
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        width = {250}
                        percent = {progress_val*100}
                    />
                </div>
                
            </CircleContainer>
        )
    }
}

export default CircleChart
