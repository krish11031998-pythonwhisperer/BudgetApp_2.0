import axios from 'axios'
import React, { Component } from 'react'
import {Table,message} from 'antd'


class Products extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            log: []
        }
        this.url ="http://localhost:8000/product"
    }

    
    componentDidMount(){
        axios.get(`${this.url}/`)
        .then(res => {
            this.setState({
                log : res.data
            },() => {
                console.log(this.state.log);
            })
        })
        .catch(err => {
            console.log(`Error : ${err}`);
        })
    }

    getLatest(){
        axios.get(`${this.url}/`)
        .then(res => {
            this.setState({
                log : res.data
            },() => {
                console.log(this.state.log);
            })
        })
        .catch(err => {
            console.log(`Error : ${err}`);
        })
    }

    addNewProduct(url,saving_timeframe){
        console.log(url,saving_timeframe);
        axios.post(`${this.url}/add`,{ url, saving_timeframe})
            .then(() => {
                message.success(`Successfully added into the Product log`);
                this.getLatest();
            })
            .catch((e) => {
                message.warning(`There was an error -> ${e}`);
            })

    }

    get columns(){
        return ([
            {
                title:"Product",
                dataIndex : "name",
                key:"name"
            },
            {
                title:"Cost",
                dataIndex : "price",
                key:"price"
            },
            {
                title:"Currency",
                dataIndex : "currency",
                key:"currency"
            },
            {
                title: "Time Frame",
                dataIndex:'saving_timeframe',
                key:"saving_timeframe"
            }
        ])
    }

    get dataSource(){
        let {log} = this.state;
        return log.map((el,elnum) => {
            let {name,currency,price,saving_timeframe} = el;
            saving_timeframe = `${Math.round(price/saving_timeframe)} pm`
            return {
                key: String(elnum),
                name,
                price,
                saving_timeframe,
                currency
            }
        });

    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.dataSource}/>
            </div>
        )
    }
}

export default Products
