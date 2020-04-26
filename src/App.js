import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import UserInput from './components/userInput'
import Charts from './components/charts';
import Typed from 'react-typed'
import PopupModal from './components/popup-modal'
import ProductModal from './components/ProductModal'
import Products from './components/Products'
import { TopSection,NumberHeader, LargeHeader, TransactionBtn } from './style'
import {Fab } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './style.css'
import 'antd/dist/antd.css'
// import 'framework7-react/'
import { Carousel } from 'antd'

class App extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
       color_balance:"White",
       total_balance_string : 0,
       total_credit: 0,
       total_debit : 0,
       total_saving : 0,
       date: new Date(),
       type_transc: 'Credit',
       description:"",
       transc_amt : 0
    }
    this.userInputRef = React.createRef();
    this.modalRef = React.createRef();
    this.PmodalRef = React.createRef();
    this.ProductRef = React.createRef();
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

  updateProductLog = (data) => {
    let{ url, saving_timeframe} = data;
    console.log(this.ProductRef);
    this.ProductRef.current.addNewProduct(url,saving_timeframe);
  }

  update_transc = (update) =>{
    let {type_transc,transc_amt,description,date} = update
    type_transc = type_transc.toLowerCase();
    let transc_obj = {type:type_transc,amt:transc_amt,description,date}
    console.log(transc_obj);
    this.userInputRef.current.update_transc(transc_obj);
  }

  updateUI = (balance_string,color_balance,...args) =>{
        let [credit,debit] = args
        this.setState({
          color_balance: color_balance,
          total_balance_string : balance_string,
          total_credit : credit,
          total_debit : debit
        });
  }

  showModal = (type = 'transc') => {
      if (type === 'transc'){
        this.modalRef.current.onChangeShow();
      }
      else{
        this.PmodalRef.current.changeShow();
      }
  }


  render(){
    let {color_balance,total_balance_string,date,type_transc,total_credit,total_debit} = this.state;
    // let date = new Date()
    return(
      <>
        <Carousel autoplay dotPosition={"top"}>
          <TopSection url={process.env.PUBLIC_URL +"/photo-1450849608880-6f787542c88a.jpeg"}>
            <div className="introducing-header">
              <Typed
                  strings={['Hello Krishna']}
                  typeSpeed={50}
                  className={"LargeHeader"}
              />
              <p> Your balance  as of <span className="date-span">{date.toUTCString()}</span> :</p>
              <NumberHeader color={color_balance}>{total_balance_string}</NumberHeader>
            </div>
            {/* <button className="submit_button" onClick = {this.showModal}>New Transaction +</button>
            <PopupModal ref={this.modalRef} update={this.update_transc}/> */}
          </TopSection>
          <TopSection url={process.env.PUBLIC_URL +"/rising-city-bw-3440x1440.jpg"}>
              <div className="introducing-header">
                <LargeHeader>Total Credit</LargeHeader>
                <p> Your balance  as of <span className="date-span">{date.toUTCString()}</span> :</p>
                <NumberHeader color={"limegreen"}>{`+${total_credit}`}</NumberHeader>
              </div>
          </TopSection>
          <TopSection url={process.env.PUBLIC_URL +"/b496366ec09b3d7685cc64bf0bdaaebe.jpg"}>
              <div className="introducing-header">
                <LargeHeader>Total Debit</LargeHeader>
                <p> Your balance  as of <span className="date-span">{date.toUTCString()}</span> :</p>
                <NumberHeader color={"Red"}>{`-${total_debit}`}</NumberHeader>
              </div>
          </TopSection>
        </Carousel>
        <TransactionBtn>
          <Fab color="blue" aria-label="add" onClick={() => {this.showModal()}}>
            <AddCircleIcon/>
          </Fab>
         <span className="TBText">Add Transaction</span>
         <Fab color="blue" aria-label="add" onClick={() => this.showModal('product')}>
            <AddCircleIcon/>
          </Fab>
         <span className="TBText">Add Product Tracking</span>
        </TransactionBtn> 
        <PopupModal ref={this.modalRef} update={this.update_transc}/>
        <ProductModal ref={this.PmodalRef} sendHandler={this.updateProductLog}/>
        <UserInput  allexpenseChart = {<Charts name='All Expenses'/>} debitChart={<Charts name="Debits"/>} ref={this.userInputRef} updateUI={this.updateUI}>
        </UserInput>
        <div className="pscontainer">
          <div className="DContainer">
            <Products ref={this.ProductRef} />
          </div>
        </div>
      </>
      
    )

  }
}

export default App;
