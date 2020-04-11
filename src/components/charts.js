import React, { Component } from 'react'
import { Doughnut,Bar } from 'react-chartjs-2'
import '../style.css'
export class Charts extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            chart_name: props.name,
            chartdata:{
            },
            legendDisplay :{display : false},
            padding : {
                left: 25,
                right: 25,
                top: 25,
                bottom: 25
            },
        }
        console.log(props);
    }

    componentDidUpdate(){
        if(this.props.chartdata && this.props.chartdata !== this.state.chartdata){
            this.setState({
                chartdata : this.props.chartdata
            });
        }
    }

    componentDidMount(){
        if (this.props.chartdata !== this.state.chartdata && this.props.chartdata){
            this.setState({
                chartdata : this.props.chartdata
            });
        }
    }

    updateChartData = (chartdata) => {
        if(chartdata){
            this.setState({
                chartdata: chartdata
            })
        }
    }
    
    render() {
        const {chartdata} = this.state
        return (
            <>
                <div>
                    <h1 className="header">{this.state.chart_name}</h1>
                    <div className="chartcontainer">
                        <Doughnut
                            data={ chartdata }
                                width={100}
                                height={50}
                                options={{legend:this.state.legendDisplay,padding: this.state.padding}}
                        />
                    </div>
                </div>
                
            </>
        )
    }
}

export default Charts
