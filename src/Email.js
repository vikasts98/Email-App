import React, { Component } from 'react'
import axios from 'axios';

export default class Email extends Component {

    state={
        name:'',
        email:'',
        message:'',
        sent:false
    }
    //handle inputs
    handleName=(event)=>{
        this.setState({
            name:event.target.value
        })
    }
    handleEmail=(event)=>{
        this.setState({
            email:event.target.value
        })
    }
    handleMessage=(event)=>{
        this.setState({
            message:event.target.value
        })
    }
    
    //submit button function
    sendEmail=(event)=>{
        event.preventDefault();
        let data={
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        }
        axios.post('/api/email',data)
        .then(res=>{
            this.setState({
                sent:true,
            },this.resetPage())
        }).catch(()=>{
            console.log('message not sent');
        })
    }

    //for reseting initial data
    resetPage=()=>{
        this.setState({
            name:'',
            email:'',
            message:'',
        })
        setTimeout(()=>{
            this.setState({
                sent:false,
            })
        },3000)
    }
    
    //input fields
    render() {
        return (
            <div className="container">
                <form onSubmit={this.sendEmail}>
                    <div className="singleItem">
                        <label>Name</label>
                        <input type="text" name="name" className="name" placeholder="your name"
                        value={this.state.name} onChange={this.handleName}></input>
                    </div>
                    <div className="singleItem">
                        <label>Email</label>
                        <input type="text" name="email" className="name" placeholder="your email"
                        value={this.state.email} onChange={this.handleEmail}></input>
                    </div>
                    <div className="textArea singleItem">
                        <label>Message</label>
                        <textarea type="text" name="message" cols="30" rows="5" placeholder="your message"
                        value={this.state.message} onChange={this.handleMessage}></textarea>
                    </div>
                    <div className="btn">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}
