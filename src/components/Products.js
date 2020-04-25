import axios from 'axios'
import React, { Component } from 'react'
import {Table,message, Tag} from 'antd'
import moment from 'moment'


class Products extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            log: []
        }
        this.url ="http://localhost:8000/product"
    }

    
    componentDidMount(){
        axios.post(`${this.url}/updateprice`)
            .then(() => {
                message.success(`Sucessfully updated the products price`);
                this.getLatest();
            })
            .catch(err => {
                console.log(`There was error ${err}!`);
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

    deleteProduct(id){ 
        console.log(id);
        let obj = {id};
        console.log(JSON.stringify(obj));
        axios.delete(`${this.url}/delete/${id}`,{ 
            param: {id}
        })
            .then(() => {
                message.warn(`Deleting the delete log ${ id }`);
                this.getLatest();
            })
            .catch(() => {
                console.log(`There was error in ${ id }`);
            });
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

    calcPercent = (...args) => {
        let [price,prev_price] = args;
        console.log(price,prev_price);
        let diff = prev_price - price;
        let color = (diff >= 0) ? 'green' : 'volcano';
        let percent = `${(diff>0) ? '+' : (diff === 0) ? '' : '-'} ${Math.abs(diff/prev_price)}%`;
        return (
            <Tag color={color}>
                {percent}
            </Tag>
        )
    }
    get columns(){
        return ([
            {
                title: "ID",
                dataIndex:"id",
                key:"id"
            },
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
            },
            {
                title: "Updated",
                dataIndex : 'prev_price',
                key: "prev_price",
                render : (text,record) => (
                    <span>
                        {this.calcPercent(record.price,record.prev_price)}
                    </span>
                )
            },
            {
                title:'Link',
                key:'link',
                render: (text,record) => (
                    <span>
                        <a href={record.url}>Click Me</a>
                    </span>
                )

            },
            {
                title:'',
                key:'action',
                render: (text,record) => (
                    <span>
                        <a onClick={() => {this.deleteProduct(record.id)}}>X</a>
                    </span>
                )

            },

        ])
    }

    get dataSource(){
        let {log} = this.state;
        return log.map((el,elnum) => {
            // console.log(JSON.stringify(el));
            let {_id: id,url,name,currency,price,prev_price,saving_timeframe} = el;
            // console.log(id);
            saving_timeframe = `${Math.round(price/saving_timeframe)} pm`
            return {
                id,
                url,
                name,
                price,
                prev_price,
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
