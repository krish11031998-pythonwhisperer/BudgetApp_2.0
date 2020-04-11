import React, { Component } from 'react'
import '../style.css'
import { CircleContainer } from '../style'
import CheckIcon from './CheckIcon'
import CrossIcon from './CrossIcon'
import TrancDetails from './tranc_details'
import MdAddCircle from 'react-ionicons/lib/MdAddCircle'
import MdRemoveCircle from 'react-ionicons/lib/MdRemoveCircle' 
import MdClose from 'react-ionicons/lib/MdClose'
import { Circle, SemiCircle, Line } from 'react-es6-progressbar.js'
import CircleChart from './circleChart'
const randomcolorgen = (obj) =>{
    var count = 0;
    var colors = [];
    console.log(count,obj.log().length,obj.log())
    while(count <= obj.log().length){
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        colors.push(randomColor);
        console.log(randomColor);
        count++;
    }
    return colors
}


export class Transaction extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            log : [],
            recordDelHandler: props.onDel
        }
        this.changeShow = this.changeShow.bind(this);
        this.credit_refs = [];
        this.debit_refs = [];
        this.subs_refs = [];
    }
    
    removeRecord = (id,type='credit') =>{
        console.log(`removeRecord function is being called with id ${id} and log : ${JSON.stringify(this.state.log)}`);
        this.setState(prevState => {
            return{
                log : prevState.log.filter(el => (el.id !== id)),
            }
        },()=>{console.log(`The log looks like the following: ${this.state.log}`,this.state.log);this.state.recordDelHandler(type);});
        
    }

    changeShow(event){
        console.log(event.currentTarget,event.currentTarget.id);
        const [type, id] = event.currentTarget.id.split('_');
        var element = ((type === 'credit') ? this.credit_refs : (type === 'debit') ? this.debit_refs : this.subs_refs).filter(el => el.current != null);
        console.log(element)
        element = element[id]
        if(element.current != null){
            element.current.changeShow();
        }
        else{
            console.log('Nothing to show here')
        }
    }
    getid = () =>{
        return this.state.log.map(el => el.id);
    }

    log = () =>{
        return this.state.log
    }
    componentDidMount(){
        if (this.props.transaction){
            if(!this.getid().includes(this.props.transaction.id)){
                this.setState(prevState => {
                    return{
                        log : [...prevState.log,...this.props.transaction],
                    }
                },()=>{console.log(`New credit_log is ${this.state.credit_log}`)})
            }
        }
    }

    addtrans_log(new_log){
        this.setState(prevState => {
            return{
                log : [...prevState.log,new_log]
            }
        },()=>{console.log(`New credit_log is ${this.state.log}`)});
    }
}

class Credit extends Transaction{

    render() {
        const {log} = this.state;
        return (
            <>
                <ul className="transaction-list">
                    {log.map((el,elnum)=>{
                        let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                        var ref = React.createRef();
                        var key = `credit_${elnum}`
                        this.credit_refs.push(ref);
                        return <li key={key} id={key} className={`${li_style}`}  ><MdAddCircle className="addCircle" color="Green"/><span id={key} onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(el.id)}} className="closeCircle"/></span></span><TrancDetails details={el} ref={ref}/></li>
                    })}
                </ul>
            </>
        )
    }
}

class Saving extends Transaction{

    constructor(props) {
        super(props);
        this.chart_ref = React.createRef();
        this.state.target_val = this.props.target;
        
    }

    updateChart(){
        let total_savings = parseFloat(this.state.log.map(el => el.amt).reduce((a,b) => parseFloat(a)+parseFloat(b)));
        let percentage = total_savings/this.state.target_val
        console.log(percentage,this.state.log.map(el=> el.amt));
        this.chart_ref.current.change_progress_val(percentage);
    }
    
    addtrans_log(new_log){
        console.log(new_log);
        this.setState(prevSate => {
                return {
                    log : [...prevSate.log,new_log],
                    progressVal : prevSate.progressVal + parseFloat(new_log.amt)
                }
            },()=>{ console.log(`Calling from the Saving Component extending from Transaction with state : ${JSON.stringify(this.state)}`);console.log(Object.entries(this.state));this.updateChart()});
        
        // super.addtrans_log(new_log);
    }


    render() {
        // const {log} = this.state;
        // let total_savings = parseFloat((log.length > 0) ? log.map(el => el.amt).reduce((a,b) => parseFloat(a)+parseFloat(b)) : 0 );
        // let progress_val = 0.25+(total_savings/100);
        // var containerStyle = {
        //     width: '100px',
        //     height: '100px'
        // };
        // console.log(log,total_savings,progress_val,typeof progress_val);
        return (
            <>
                <CircleChart target={1000} ref={this.chart_ref}/>
            </>
        )
    }
}

class Debit extends Transaction{

    getTransaction = (unicolor=true) =>{
        var data_obj  = {
            labels : this.log().map(el => el.description),
            datasets:[{
                label: 'Expenses',
                data: this.log().map(el => el.amt),
                backgroundColor: (unicolor) ? 'Red' : randomcolorgen(this),
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth:3,
                hoverBorderColor:'black'
                }],
        }
        return data_obj
    }

    render() {
        const {log} = this.state;
        return (
            <>
                <ul className="transaction-list">
                    {log.map((el,elnum)=>{
                        let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                        var ref = React.createRef();
                        this.debit_refs.push(ref);
                        return <li key={`debit_${elnum}`} id={`debit_${elnum}`} className={`${li_style}`}  onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}}><MdRemoveCircle className="removeCircle" color="Red"/><span id={`debit_${elnum}`} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(el.id,'debit')}} className="closeCircle"/></span></span><TrancDetails details={el} ref={ref}/></li>
                    })}
                </ul>
            </>
        )
    }
}

class Subscription extends Transaction{

    getTransaction = (unicolor=true) =>{
        var data_obj  = {
            labels : this.log().map(el => el.description),
            datasets:[{
                label: 'Expenses',
                data: this.log().map(el => el.amt),
                backgroundColor: (unicolor) ? 'Red' : randomcolorgen(this),
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth:3,
                hoverBorderColor:'black'
                }],
        }
        return data_obj
    }

    render() {
        const {log} = this.state;
        return (
            <>
                <ul className="transaction-list">
                    {log.map((el,elnum)=>{
                        let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                        var ref = React.createRef();
                        this.subs_refs.push(ref);
                    return <li key={`subs_${elnum}`} id={`subs_${elnum}`}  className={`${li_style}`} onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}}><MdRemoveCircle className="removeCircle" color="Orange"/><span id={`subs_${elnum}`} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(el.id,'sub')}} className="closeCircle"/></span></span><TrancDetails details={el} ref={ref}/></li>
                    })}
                </ul>
            </>
        )
    }
}

export { Credit , Debit , Subscription, Saving}
