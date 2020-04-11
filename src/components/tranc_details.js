import React, { Component } from 'react'
import {ToolTipPanel,TooltipPlace ,PreScreening, Key, Value, DelButton} from '../style'
export class Tranc_Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            details : {},
            show : false,
            eventhandler: undefined
        }
    }

    componentDidMount(){
        if(this.props.details && (this.props.details != this.state.details || this.props.show !== this.state.show)){
            this.setState({
                details: this.props.details,
                show: this.props.show,
                eventhandler : this.props.eventhandler
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
        return word.split("").map((el,elnum) => (elnum === 0) ? el.toUpperCase() : el);
    }

    getDetails = () =>{
        const { details } = this.state;
        return Object.entries(details).map(([key,value],num) => {
            var color = (key !== 'type') ? 'White' : (value === 'credit') ? 'Green' : (value == 'debit') ? 'Red' : 'Orange';
            return <li key={num}><Key>{`${key.toLocaleUpperCase()} : `}</Key><Value color={color}>{Tranc_Details.Capitalize_word(String(value))}</Value></li>
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
