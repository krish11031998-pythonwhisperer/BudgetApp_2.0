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
import Animate from 'animate.css-react'
import 'animate.css/animate.css'
import axios from 'axios'
import { message, Pagination } from 'antd'

const capitalize_word = word => word.split("").map((el,elnum) => (elnum === 0) ? el.toUpperCase() : el).reduce((a,b) => a+b);

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
            recordDelHandler: props.onDel,
            startIndex: 0,
            endIndex : 9,
            curr_log : []
        }
        this.changeShow = this.changeShow.bind(this);
        this.updateTB = this.props.updateTB;
        this.type = undefined;
        this.changeIndex = this.changeIndex.bind(this);

        // this.credit_refs = [];
        // this.debit_refs = [];
    }
    
    removeRecord = (id) =>{
        console.log(`removeRecord function is being called with id ${id} and log : ${JSON.stringify(this.state.log)}`);
        console.log(id);
        axios.delete(`${this.url}/delete/${id}`,{
            param : { id : id }
        }).then(() => {
                this.updateLogAfterRequest('Remove');
            })
            .catch(() => {
                console.log(`There was an error`);
            })
        
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

    get logLength() {
        return this.state.log.length
    }

    total_amt = () =>{
        return (this.log().length  > 0) ? this.log().map(el => el.amt).reduce((a,b) => parseFloat(a)+parseFloat(b)) : 0;
    }
    updateLogAfterRequest(type){
        axios.get(`${this.url}/`)
            .then(res => {
                console.log(`Result from the get call is ${res.data} for ${this.type} transaction`);
                this.setState(prevState => {
                    return{
                        log : res.data,
                        curr_log : Array(res.data).slice(prevState.startIndex,prevState.endIndex)
                    }

                },() => {
                    console.log(`Updated the log`)
                    this.updateTB(this.type);
                    if(type === 'Add'){
                        message.success(`Successfully added to the ${capitalize_word(this.type)}`)
                    }
                    else if (type === 'Remove'){
                        message.warning(`Removed from ${capitalize_word(this.type)}`)
                    }
                });
            })
            .catch(() => {console.log(`There was an error`)})
    }

    changeIndex(e){
        this.setState(prevState => {
            return {
                startIndex : (e-1)*10,
                endIndex: e*10-1,
                curr_log : prevState.log.filter((_,elnum) => (elnum <= e*10-1 && elnum >= (e-1)*10))
            }
        },() => {
            console.log(`StartIndex ${this.state.startIndex} and EndIndex ${this.state.endIndex}`);
        })
    }

    addtrans_log(new_log){
        axios.post(`${this.url}/add`,new_log)
            .then(() => {
                this.updateLogAfterRequest('Add');

            })
            .catch(() => {console.log(`There was an error!`)});
    }

}

class Credit extends Transaction{

    constructor(props) {
        super(props)
        this.type = 'credit'
        this.credit_refs = [];
        this.url = 'http://localhost:8000/credit';
        
    }

    componentDidMount(){
        axios.get(`${this.url}/`)
            .then(res =>{
                this.setState(prevState => {
                    return {
                        log: res.data,
                        curr_log : res.data.filter((_,elnum) => (elnum <= prevState.endIndex))
                    }
                },()=>{
                    console.log(`Updated the log : ${this.state.log}`);
                    let gross_amt = (this.state.log.length > 0) ? parseFloat(this.state.log.map(el => parseFloat(el.amt)).reduce((a,b) => a+b)) : 0;
                    console.log(`Gross Value is ${gross_amt}`);
                    this.updateTB('credit');
                })
            })
            .catch(() => {console.log(`There was an error`)});
    }
    

    render() {
        const {log,startIndex,endIndex,curr_log} = this.state;
        return (
            <div>
                <Animate enter="bounceIn" // on Enter animation
                        leave="bounceOut" // on Leave animation
                        appear="fadeInRight" // on element Appear animation (onMount)
                        change="flipInX"
                        component="ul"
                        className="transaction-list">
                    {curr_log.map((el,elnum)=>{
                        let id = el._id;
                        let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                        var ref = React.createRef();
                        var key = `credit_${elnum}`
                        this.credit_refs.push(ref);
                        return <li key={key} id={key} className={`${li_style}`}  ><MdAddCircle className="addCircle" color="Green"/><span id={key} onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(id)}} className="closeCircle"/></span></span><TrancDetails details={el} type={this.type} ref={ref}/></li>
                    })}
                </Animate>
                <Pagination className={"paginationAlign"} size="small" defaultCurrent = {1} defaultPageSize={8} onChange={this.changeIndex} total={this.logLength}/>
            </div>
        )
    }
}

class Saving extends Transaction{

    constructor(props) {
        super(props);
        this.type = 'saving'
        this.chart_ref = React.createRef();
        this.state.target_val = this.props.target; 
        this.url = 'http://localhost:8000/saving'
        
    }

    componentDidMount(){
        axios.get(`${this.url}/`)
            .then(res =>{
                this.setState({
                        log: res.data
                },()=>{console.log(`Updated the log : ${this.state.log}`);this.updateChart()})
            })
            .catch(() => {console.log(`There was an error`)});
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
    
    }

    render() {
        return (
            <>
                <CircleChart target={1000} ref={this.chart_ref}/>
            </>
        )
    }
}

class Debit extends Transaction{

    constructor(props) {
        super(props)
        this.type = 'debit';
        this.debit_refs = [];
        this.url = 'http://localhost:8000/debit'
        this.updateTB = this.props.updateTB
    }

    componentDidMount(){
        axios.get(`${this.url}/`)
            .then(res =>{
                this.setState(prevState => {
                    return {
                        log: res.data,
                        curr_log : res.data.filter((_,elnum) => (elnum <= prevState.endIndex))
                    }
                },()=>{
                    console.log(`Updated the log : ${this.state.log}`);
                    let gross_amt = (this.state.log.length > 0) ? parseFloat(this.state.log.map(el => parseFloat(el.amt)).reduce((a,b) => a+b)) : 0;
                    console.log(`calling updateTB for  ${this.type}`);
                    this.updateTB('debit');
                })
            })
            .catch(() => {console.log(`There was an error`)});
    }

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
        const {log,startIndex,endIndex,curr_log} = this.state;
        return (
            <>
                <Animate enter="bounceIn" // on Enter animation
                        leave="bounceOut" // on Leave animation
                        appear="fadeInRight" // on element Appear animation (onMount)
                        change="flipInX"
                        component="ul"
                        className="transaction-list">
                    {curr_log.map((el,elnum)=>{
                        let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                        var ref = React.createRef();
                        this.debit_refs.push(ref);
                        return <li key={`debit_${elnum}`} id={`debit_${elnum}`} className={`${li_style}`}  onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}}><MdRemoveCircle className="removeCircle" color="Red"/><span id={`debit_${elnum}`} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(el._id)}} className="closeCircle"/></span></span><TrancDetails details={el} type={this.type} ref={ref}/></li>
                    })}
                </Animate>
                <Pagination className={"paginationAlign"} size="small" defaultCurrent = {1} defaultPageSize={8} onChange={this.changeIndex} total={this.logLength}/>
            </>
        )
    }
}

class Subscription extends Transaction{

    constructor(props) {
        super(props)
        this.type = 'subs';
        this.subs_refs = [];
        this.url = 'http://localhost:8000/subs'
        this.updateTB = this.props.updateTB
    }

    componentDidMount(){
        axios.get(`${this.url}/`)
            .then(res =>{
                this.setState(prevState => {
                    return {
                        log: res.data,
                        curr_log : res.data.filter((_,elnum) => (elnum <= prevState.endIndex))
                    }
                },()=>{
                    console.log(`Updated the log : ${this.state.log}`);
                    let gross_amt = (this.state.log.length > 0) ? parseFloat(this.state.log.map(el => parseFloat(el.amt)).reduce((a,b) => a+b)) : 0;
                    console.log(`Gross Value is ${gross_amt}`);
                    this.updateTB(gross_amt,'subs');})
            })
            .catch(() => {console.log(`There was an error`)});
    }

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
        const {log,startIndex,endIndex,curr_log} = this.state;
        return (
            <>
                <Animate enter="bounceIn" // on Enter animation
                        leave="bounceOut" // on Leave animation
                        appear="fadeInRight" // on element Appear animation (onMount)
                        change="flipInX"
                        component="ul"
                        className="transaction-list">
                    {curr_log.map((el,elnum)=>{
                            let li_style = (elnum % 2 === 0) ? "lightli" : "darkli";
                            var ref = React.createRef();
                            this.subs_refs.push(ref);
                        return <li key={`subs_${elnum}`} id={`subs_${elnum}`}  className={`${li_style}`} onMouseOver={(event) => {this.changeShow(event)}} onMouseOut={(event)=>{this.changeShow(event)}}><MdRemoveCircle className="removeCircle" color="Orange"/><span id={`subs_${elnum}`} className="textAlign: absolute-center;"><span className="transaction-text">{el.description}</span><span className='amt-text'>{el.amt}<MdClose onClick={() => {this.removeRecord(el._id)}} className="closeCircle"/></span></span><TrancDetails details={el} type={this.type} ref={ref}/></li>
                        })}
                </Animate>
                <Pagination className={"paginationAlign"} size="small" defaultCurrent = {1} onChange={this.changeIndex}  defaultPageSize={8} total={this.logLength}/>
            </>
        )
    }
}

export { Credit , Debit , Subscription, Saving}
