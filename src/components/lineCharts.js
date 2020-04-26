import React, { Component, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import '../style.css'

export class LineChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            log : []
        }
        this.monthly = Array(12).fill(0);
        console.log(`monthly is initialized to ${this.monthly}`);
        this.month = new Date().getMonth();
        console.log(`month : ${this.month}`);
    }

    componentDidMount(){
        if(this.props.log){
            this.setState({
                log : this.props.log
            },() => {
                this.updateMonthly();
            })
        }
        else{
            this.monthly = Array(12).fill(0);
        }
        
    }

    updateLog(log){
        console.log(`This is the provided ${log}`);
        this.setState({
            log: log
        },() =>{
            console.log(this.state.log,this.monthly);
            this.updateMonthly();
        })
    }

    updateMonthly = () => {
        let {log} = this.state;
        log.forEach(el => {
            let {date,amt} = el;

            let month = parseInt(date.split("-")[1]);
            this.monthly[month-1] += amt;
            console.log(`Date ${date} amt: ${amt} month : ${month} and monthly :${this.monthly}`)
        })
    }
    

    get data(){
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'].filter((_,elnum) => (elnum <= this.month+2)),
            datasets : [
                {
                    label : 'Actual Expense',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.monthly.filter((_,elnum) => (elnum <= this.month)),
                }
            ]
        }
    }

    get lineOptions(){
        return {
            scales :{
                xAxes: [{
                    gridLines: {
                        display: true,
                        },
                    }],
                yAxes: [{
                    // stacked: true,
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                      beginAtZero: true,
                      // Return an empty string to draw the tick line but hide the tick label
                      // Return `null` or `undefined` to hide the tick line entirely
                    },
                  }],
                },
                legend: {
                  display: true,
                },
                tooltips: {
                  enabled: true,
                },
            }
    }


    render() {
        return (
        <div>
            <h1 className="header">Expense Time Series</h1>
            <div className='chartcontainer'>
                <Line data={this.data} options={this.lineOptions}/>
            </div>
        </div>
            
        )
    }
}

export default LineChart