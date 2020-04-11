import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import UserInput from './components/userInput'
import Charts from './components/charts';
import PopTest from './components/popup_test'
import Typed from 'react-typed'

class App extends Component{

  // constructor(props) {
  //   super(props)
  
  //   this.state = {
  //      color_balance:"White",
  //      total_balance_string : "0",
  //      date: new Date(),
  //      type_transc: 'Credit',
  //      description:"",
  //      amt : 0
  //   }
  // }
  
  // change_type = (event) =>{
  //     console.log(event.target);
  //     this.setState({
  //       type_transc : event.target.value
  //     },() => {console.log(`Changed the value of the transaction type`)});
  // }

  // change_descp = (event) => {
  //     console.log(event.target.value);
  //     this.setState({
  //       description : event.target.value
  //     },() => {console.log(`Changed the value of description type`)});
  // }

  // change_transc = (event) => {
  //     console.log(event.target)
  // }


  render(){
    // let {color_balance,total_balance_string,date,type_transc} = this.state;
    return(
      <>
        {/* <div className="top-section">
          <div className="introducing-header">
            <Typed
                strings={['Hello Krishna']}
                typeSpeed={50}
                className={"welcomeHeader"}
            />
            <p> Your balance  as of <span className="date-span">{date}</span> :</p>
            <h1 className={color_balance}>{total_balance_string}</h1>
          </div>
          <select className= "type_selection"value={type_transc} onChange ={this.change_type}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="sub">Subcription</option>
            <option value="save">Saving</option>
          </select>
          <input className="inputs" onChange={this.change_descp}></input>
          <input className="inputs" onChange={this.change_transc}></input>
          <button className="submit_button" onClick = {this.update_transc}>Submit</button>
        </div>  */}
        <UserInput description= " " amt={0} type="Credit" allexpenseChart = {<Charts name='All Expenses'/>} debitChart={<Charts name="Debits"/>}>
        </UserInput>
      </>
      
    )

  }
}

export default App;
