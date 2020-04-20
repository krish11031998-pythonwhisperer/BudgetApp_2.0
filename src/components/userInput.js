import React, { Component, Children } from 'react'
import { Credit, Debit, Subscription, Saving } from './Transaction'
import '../style.css'
import { Pagination } from 'antd'
import Typed from 'react-typed'


class userInput extends Component{

    constructor(props) {
        super(props);
        var date = new Date();
        this.credit_id = 0;
        this.debit_id = 0;
        this.subs_id = 0;
        this.saving_id = 0;
        this.c_ref = React.createRef();
        this.d_ref = React.createRef();
        this.s_ref = React.createRef();
        this.save_ref = React.createRef();
        this.allExpenseChart_ref = React.createRef();
        this.debitChart_ref = React.createRef();
        this.state = {
            type_transc: props.type,
            transc_amt : props.amt,
            description:props.description,
            total_credit: 0,
            total_debit: 0,
            total_balance: 0,
            date: date.toUTCString()
        }
        this.change_transc = this.change_transc.bind(this);
        this.change_type = this.change_type.bind(this);
        this.change_descp = this.change_descp.bind(this);
        this.update_transc = this.update_transc.bind(this);
        this.update_after_del = this.update_after_del.bind(this);
        this.updateAppUI = this.props.updateUI
    }

    reduceLog = (ref) => ref.current.log().map(el => el.amt).reduce*((a,b) => a+b);

    updateCharts(){
        this.allExpenseChart_ref.current.updateChartData({
            labels : ['Debit','Subcription'],
            datasets:[{
                label: 'All Expenses',
                data: this.allexpenseData(),
                backgroundColor: ['Red','Orange'],
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth:3,
                hoverBorderColor:'black'
            }],
        });
        this.debitChart_ref.current.updateChartData(this.d_ref.current.getTransaction(false));
    }


    updateTotalBalance(type){
        let {total_balance,total_credit,total_debit} = this.state
        this.setState({
                    total_balance : this.c_ref.current.total_amt() - this.d_ref.current.total_amt(),
                    total_credit : this.c_ref.current.total_amt(),
                    total_debit : this.d_ref.current.total_amt() 
        },()=>{
            console.log(JSON.stringify(this.state));
            this.updateCharts();
            const [total_balance_string,color_balance] = this.total_balance_assigner();
            this.updateAppUI(total_balance_string,color_balance,this.c_ref.current.total_amt(),this.d_ref.current.total_amt());
        })
    }

    change_transc(event){
        this.setState({
            transc_amt : event.target.value
        },()=>{console.log(`Transaction Value has been updated ${this.state.transc_amt}`);})
    }

    change_type(event){
        console.log(event.target);
        this.setState({
            type_transc : event.target.value
        },()=>{console.log(`Transaction Type has been updated ${this.state.type_transc}`);})
    }

    change_descp(event){
        this.setState({
            description: event.target.value
        },()=>{console.log(`Description has been updated ${this.state.description}`);})
    }

    allexpenseData = () =>{
        var d_arr = this.d_ref.current.log().map(el => el.amt);
        var s_arr = this.s_ref.current.log().map(el => el.amt);
        console.log(d_arr,s_arr);
        return [(d_arr.length > 0) ? d_arr.reduce((a,b) => parseFloat(a)+parseFloat(b)) : 0 , (s_arr.length > 0) ? s_arr.reduce((a,b) => parseFloat(a)+parseFloat(b)) : 0]
    }

    update_transc(transc_obj){
        const {type,amt,description,date} = transc_obj;
        console.log(type,amt,description);
        console.log(`Object Created => ${JSON.stringify(transc_obj)}`);
        if (type === 'credit') {
            transc_obj.id = this.credit_id++;
            this.c_ref.current.addtrans_log(transc_obj);
        }     
        else if (type === 'debit'){
            transc_obj.id = this.debit_id++;
            this.d_ref.current.addtrans_log(transc_obj);
        }
        else if (type === 'sub'){
            transc_obj.id = this.subs_id++;
            this.s_ref.current.addtrans_log(transc_obj);
        }
        else if (type=== 'save'){
            transc_obj.id = this.saving_id++;
            this.save_ref.current.addtrans_log(transc_obj);
        }
        this.setState(prevState=>{
            return {
                total_debit : prevState.total_debit + (type === 'credit') ? 0 : parseFloat(amt),
                total_credit: prevState.total_credit + (type === 'credit') ? parseFloat(amt) : 0,
                total_balance: (type === 'credit') ? parseFloat(prevState.total_balance) + parseFloat(amt) : (type === 'save') ? parseFloat(prevState.total_balance) : parseFloat(prevState.total_balance) - parseFloat(amt)  
            }
        },()=>{
            console.log(`The total_balance is ${this.state.total_balance}`);
            if(type === 'debit' || type === 'sub'){
                console.log(`Updating the charts after adding new transcations ${type}`);
                this.updateCharts();
            }
            const [total_balance_string,color_balance] = this.total_balance_assigner();
            this.updateAppUI(total_balance_string,color_balance)
          });

    }

    update_after_del(type = 'credit'){
        console.log(`update_after_del is being called`);
        var t_credit , t_debit ;
        t_credit = ((this.c_ref.current !== null && this.c_ref.current.log().length > 0) ? this.c_ref.current.log().map(el=> parseFloat(el.amt)).reduce((a,b) => a+b) : 0);
        t_debit = ((this.d_ref.current !== null && this.d_ref.current.log().length > 0) ? this.d_ref.current.log().map(el => parseFloat(el.amt)).reduce((a,b) => a+b) : 0) + ((this.s_ref && this.s_ref.current !== null && this.s_ref.current.log().length > 0) ? this.s_ref.current.log().map(el => parseFloat(el.amt)).reduce((a,b)=> a+b) : 0)
        console.log(`t_credit : ${t_credit} and t_debit : ${t_debit} AND this.c_ref.current.log() : ${JSON.stringify(this.c_ref.current.log())}`);
        this.setState({
            total_credit : t_credit,
            total_debit : t_debit,
            total_balance : t_credit - t_debit

        },()=>{
            if(type === 'debit' || type === 'sub'){
                console.log(this.allexpenseData());
                this.allExpenseChart_ref.current.updateChartData({
                    labels : ['Debit','Subcription'],
                    datasets:[{
                        label: 'All Expenses',
                        data: this.allexpenseData(),
                        backgroundColor: ['Red','Orange'],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth:3,
                        hoverBorderColor:'black'
                    }],
                });
                this.debitChart_ref.current.updateChartData(this.d_ref.current.getTransaction(false));
            }
            const [total_balance_string,color_balance] = this.total_balance_assigner();
            this.updateAppUI(total_balance_string,color_balance)
        })
    }

    total_balance_assigner = () => (this.state.total_balance > 0) ? ['+'+String(this.state.total_balance),'limegreen'] : [String(this.state.total_balance),(this.state.total_balance === 0) ? 'White' : 'Red']
    

    render(){
        return(
            <>
                <div className='pscontainer RedBG'>
                    <div className="QContainer Transaction_container">
                        <h3 className="header">Credit</h3>
                        <Credit onDel= {this.update_after_del} updateTB = {(type) => {this.updateTotalBalance(type)}} ref={this.c_ref}/>
                    </div>
                    <div className="QContainer Transaction_container">
                        <h3 className="header">Debit</h3>
                        <Debit onDel={this.update_after_del} updateTB = {(type) => {this.updateTotalBalance(type)}} ref={this.d_ref}/>

                    </div>
                    <div className="QContainer Transaction_container">
                        <h3 className="header">Subscription</h3>
                        <Subscription onDel={this.update_after_del} updateTB = {(type) => {this.updateTotalBalance(type)}}ref={this.s_ref}/>
                    </div>
                    <div className="QContainer Transaction_container">
                        <h3 className="header">Savings</h3>
                        <Saving onDel={this.update_after_del} target={1000} ref={this.save_ref}/>
                    </div>
                </div>
                <div className='pscontainer'>
                    <div className="QContainer Transaction_container">
                        {React.cloneElement( this.props.allexpenseChart , { ref : this.allExpenseChart_ref })}
                    </div>
                    <div className="QContainer Transaction_container">
                        {React.cloneElement( this.props.debitChart , { ref : this.debitChart_ref })}
                    </div>
                    {/* <div className="DQContainer Transaction_container">
                        {React.cloneElement( this.props.debitChart , { ref : this.debitChart_ref })}
                    </div> */}
                </div>
            </>
        )
    }
    
}

export default userInput