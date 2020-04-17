import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { BgModal , ModalContent, Close } from '../style'
import { DatePicker } from 'antd'
import moment from 'moment'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'
export class PopupModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            show:false,
            type_transc : "credit",
            description:"",
            transc_amt : 0,
            date: new Date(),
            update : this.props.update
        }

        this.transcTypeRef = React.createRef();

    }

    componentDidMount(){
        this.setState({
            type_transc : "credit",
            description : "",
            transc_amt : 0
        });
    }



    change_type = (event) =>{
        console.log(event.target);
        this.setState({
          type_transc : event.target.value
        },() => {console.log(`Changed the value of the transaction type`)});
    }
  
    change_descp = (event) => {
        console.log(event.target.value);
        this.setState({
          description : event.target.value
        },() => {console.log(`Changed the value of description type`)});
    }
  
    change_transc = (event) => {
        console.log(event.target);
        this.setState({
          transc_amt : parseFloat(event.target.value)
        },() => {console.log(`Changed the value of description type`)})
    }

    onChangeShow = () =>{
        this.setState(prevState => {
            return {
                show : !prevState.show,
                type_transc : "credit",
                description : "",
                transc_amt : 0
            }
        });
    }
    
    sendUpdate = (e) =>{

        e.preventDefault();

        let {type_transc,transc_amt,description,date} = this.state;
        this.state.update({type_transc,transc_amt,description,date});
        this.setState(prevState => {
            return {
                type_transc: "credit",
                description : "",
                transc_amt : 0,
                show : !prevState.show,
                date: new Date()
            }
        });
        
    }

    updateDate = (Date_) => {
        let {_d : date} = Date_;
        this.setState({
            date: date
        })
    }



    render() {
        let { show, type_transc,transc_amt,description,date } =this.state
        return (
            <Animate appear="fadeInDown" durationAppear={1000} component="div">
                <BgModal show={show}>
                    <ModalContent>
                        <Close onClick={this.onChangeShow}>x</Close>
                        <div className="container">
                            <form onSubmit={this.sendUpdate}>
                                <div className="form-group">
                                    <label>Transaction Type</label>
                                    <div>
                                        <select
                                            ref={this.transcTypeRef}
                                            required
                                            className = "form-control"
                                            value = {type_transc}
                                            onChange = {this.change_type}
                                        >
                                            {Object.entries({'Credit':"credit","Debit":"debit","Subscription":"sub","Saving":"saving"}).map((el,elnum) => {
                                                let [value , key] = el
                                                return <option key={elnum} value={key}>{value}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                        <input type="text"
                                            required
                                            className = 'form-control'
                                            value={description} 
                                            onChange={this.change_descp} />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                        <input type="text"
                                            required
                                            className = 'form-control'
                                            value={transc_amt} 
                                            onChange={this.change_transc} />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                        <br/>
                                        <DatePicker placeholder="Select Date" onChange={this.updateDate} />
                                </div>
                                <div>
                                    <input type="submit" value="Add" className="btn btn-primary"/>
                                </div>
                            </form>
                        </div>
                    </ModalContent>
                </BgModal>
            </Animate>            
        )
    }
}

export default PopupModal
