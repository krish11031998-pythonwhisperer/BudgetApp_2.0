import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import UserInput from './components/userInput'
import Charts from './components/charts';
import Typed from 'react-typed'
import PopupModal from './components/popup-modal'
import 'antd/dist/antd.css'
class App extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
       color_balance:"White",
       total_balance_string : "0",
       date: new Date(),
       type_transc: 'Credit',
       description:"",
       transc_amt : 0
    }
    this.userInputRef = React.createRef();
    this.modalRef = React.createRef();
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

  getUpdate = (update) =>{
    let {type_transc,transc_amt,description} = update
    this.setState({
      type_transc: type_transc,
      transc_amt:transc_amt,
      description:description
    },() => {this.update_transc()})
  }

  update_transc = (update) =>{
    let {type_transc,transc_amt,description,date} = update
    type_transc = type_transc.toLowerCase();
    let transc_obj = {type:type_transc,amt:transc_amt,description,date}
    console.log(transc_obj);
    this.userInputRef.current.update_transc(transc_obj);
  }

  updateUI = (balance_string,color_balance) =>{
        this.setState({
          color_balance: color_balance,
          total_balance_string : balance_string
        });
  }

  showModal = () => {
      this.modalRef.current.onChangeShow();
  }


  render(){
    let {color_balance,total_balance_string,date,type_transc} = this.state;
    // let date = new Date()
    return(
      <>
        <div className="top-section">
          <div className="introducing-header">
            <Typed
                strings={['Hello Krishna']}
                typeSpeed={50}
                className={"LargeHeader"}
            />
            <p> Your balance  as of <span className="date-span">{date.toUTCString()}</span> :</p>
            <h1 className={color_balance}>{total_balance_string}</h1>
          </div>
          <button className="submit_button" onClick = {this.showModal}>New Transaction +</button>
          {/* <DatePicker onChange={(date,dateString) => {
            console.log(dateString);
          }}/> */}
          <PopupModal ref={this.modalRef} update={this.update_transc}/>
        </div> 
        <UserInput  allexpenseChart = {<Charts name='All Expenses'/>} debitChart={<Charts name="Debits"/>} ref={this.userInputRef} updateUI={this.updateUI}>
        </UserInput>
      </>
      
    )

  }
}

export default App;
