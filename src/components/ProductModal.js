import axios from 'axios'
import {Modal} from 'antd'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 

export class ProductModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            show:false,
            url : "",
            saving_timeframe : 0,
        }
        this.sendHandler = this.props.sendHandler;
        this.changeURL = this.changeURL.bind(this);
        this.changeSavingTimeframe = this.changeSavingTimeframe.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
    }
    
    sendUpdate(e){
        e.preventDefault();

        let {url,saving_timeframe} = this.state;
        this.sendHandler({url,saving_timeframe});
        this.setState(prevState => {
            return{
                show : !prevState.show,
                url: "",
                saving_timeframe: ""
            }
        })
    }

    changeURL(e){
        console.log(e.target);
        this.setState({
            url : e.target.value
        }, () => {
            console.log(`Updated teh URL value ${this.state.url}`);
        })
    }


    changeSavingTimeframe(e){
        console.log(e.target);
        this.setState({
            saving_timeframe : e.target.value
        }, () => {
            console.log(`Updated teh URL value ${this.state.saving_timeframe}`);
        })
    }

    onChangeShow = () => {
        this.setState(prevState => {
            console.log(`The Modal display is at ${prevState.show}`)
            return {
                show : !prevState.show,
                url: "",
                saving_timeframe: ""
            }
        });
    }

    changeShow = () => {
        this.setState(prevState => {
            return{
                show : !prevState.show
            }
        }, () => {
            console.log(`Updated teh URL value ${this.state.show}`);
        })
    }

    render() {
        let {url , saving_timeframe, show} = this.state; 
        return (
            <Modal visible={show} onCancel={this.changeShow} footer={null}>
                        <div className="container">
                            <form onSubmit={this.sendUpdate}>
                                <div className="form-group">
                                    <label>URL</label>
                                    <input type="text"
                                            required
                                            className = 'form-control'
                                            value={url} 
                                            onChange={this.changeURL} />
                                </div>
                                <div className="form-group">
                                    <label>Saving Timeframe</label>
                                        <input type="text"
                                            required
                                            className = 'form-control'
                                            value={saving_timeframe} 
                                            onChange={this.changeSavingTimeframe} />
                                </div>
                            
                        
                                <div>
                                    <input type="submit" value="Add" className="btn btn-primary"/>
                                </div>
                            </form>
                        </div>
                    </Modal>  
        )
    }
}

export default ProductModal
