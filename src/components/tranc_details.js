import React, { Component } from 'react'
import {ToolTipPanel,TooltipPlace ,PreScreening, Key, Value, DelButton} from '../style'
import moment from 'moment'
// const capitalize_word = word => word.split("").map((el,elnum) => (elnum == 0) ? el.toUpperCase() : el).reduce((a,b) => a+b)

export class Tranc_Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            details : {},
            show : false,
            eventhandler: undefined,
            type:""
        }
    }

    componentDidMount(){
        if(this.props.details && (this.props.details != this.state.details || this.props.show !== this.state.show)){
            this.setState({
                details: this.props.details,
                show: this.props.show,
                eventhandler : this.props.eventhandler,
                type : this.props.type
            })
        }
    }

    changeShow(condition=null){
        this.setState(prevState=>{
            return{
                show: (condition == null) ? !prevState.show : condition
            }
        },()=>{console.log(`The show state in tranc_details has been change to ${this.state.show}`)})
    }

    static Capitalize_word = (word) =>{
        return word.split("").map((el,elnum) => (elnum === 0) ? el.toUpperCase() : el).reduce((a,b) => a+b);
    }

    getDetails = () =>{
        const { details, type } = this.state;
        return Object.entries(details).filter(([k,v]) => (k !== '__v')).map(([key,value],num) => {
            key = Tranc_Details.Capitalize_word(key.replace('_',""));
            value = (key === 'Date') ? value.split("T")[0] : Tranc_Details.Capitalize_word(String(value));
            var color = (type === 'credit') ? '#98ee90' : (type == 'debit') ? 'Red' : 'Orange';
            return <li key={num}><Key>{`${key} : `}</Key><Value color={color}>{value}</Value></li>    
        })
    }
    
    render() {
        const { details,show,eventhandler } = this.state
        var renderHTML = (
            <PreScreening>
                {this.getDetails()}
            </PreScreening>
        )
        return (
            <>
                <TooltipPlace>
                    {(show) ? <ToolTipPanel show>{renderHTML}</ToolTipPanel> : <ToolTipPanel>{renderHTML}</ToolTipPanel>}
                </TooltipPlace>
            </>   
        )
    }
}

export default Tranc_Details
