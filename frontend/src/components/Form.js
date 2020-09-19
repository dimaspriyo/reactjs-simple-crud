import React, { Component } from 'react'
import 'jquery/src/jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {HttpGet, HttpPost,HttpDelete} from '../utils/Req'



export default class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            name : '',
            email : '',
            country : '',
            married : 'no',
            
            headerName: this.props.headerName,
            status : 'create'
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);    
        
    }
    
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit(event){
        switch(this.state.status){
            case "create":
            var data = {
                id: this.state.id,
                name : this.state.name,
                email : this.state.email,
                country : this.state.country,
                married : this.state.married,
            }
            
            HttpPost(data,"http://localhost:3001").then((response) => {
            return response.json();
        }).
        then((value) => {
            toast.info('Insert Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            
        }).catch((value) => {
            toast.error('Insert Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }).finally(()=>{
            //this.props.onChange();
           this.setState({
            id: 0,
            name : '',
            email : '',
            country : '',
            married : 'no',
            
            headerName: this.props.headerName,
            status : 'create'
           });

           this.props.onChange();
        });
        
        
        break;
        case "update":
            var data = {
                id: this.state.id,
                name : this.state.name,
                email : this.state.email,
                country : this.state.country,
                married : this.state.married,
            }
            
            HttpPost(data,"http://localhost:3001/" + this.state.id).then((response) => {
            return response.json();
        }).
        then((value) => {
            toast.info('Update Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            
        }).catch((value) => {
            toast.error('Update Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }).finally(()=>{
           this.setState({
            id: 0,
            name : '',
            email : '',
            country : '',
            married : 'no',
            
            headerName: this.props.headerName,
            status : 'create'
           });

           this.props.onChange();
        });
        break;
        case "delete":
            var data = {
                id: this.state.id,
                name : this.state.name,
                email : this.state.email,
                country : this.state.country,
                married : this.state.married,
            }
            
            HttpDelete(data,"http://localhost:3001/" + this.state.id).then((response) => {
            return response.json();
        }).
        then((value) => {
            toast.info('Delete Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            
        }).catch((value) => {
            toast.error('Delete Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }).finally(()=>{
            //this.props.onChange();
           this.setState({
            id: 0,
            name : '',
            email : '',
            country : '',
            married : 'no',
            
            headerName: this.props.headerName,
            status : 'create'
           });

           this.props.onChange();
        });
        break;
    }
    
    
    
    event.preventDefault();
}

handleTableClick(id,status,header){
    HttpGet('http://localhost:3001/' + id).then((response)=>{
    return response.json();
}).then((person) => {
    this.setState({
        id: id,
        name: person.name,
        email: person.email,
        country: person.country,
        married: person.married,
        status: status,
        headerName : header
    });
}).catch((rejected) => {
    toast.error('System Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
});



}

render() {
    return (
        <div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <h2 className="text-center">{this.state.headerName}</h2>
        <form onSubmit={this.handleSubmit} id="form">
        <input type="hidden" name="id" value={this.state.id}/>
        <div className="form-group">
        <label >Name</label>
        <input type="text" className="form-control" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name}/>
        </div>
        <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email}/>
        </div>
        <div className="form-group">
        <label>Country</label>
        <input type="text" className="form-control" placeholder="Country" name="country" onChange={this.handleChange} value={this.state.country}/>
        </div>
        <div className="form-group">
        <label>Married</label>
        <select className="form-control" name="married" value={this.state.married} onChange={this.handleChange}>
        <option value="no">No</option>
        <option value="yes">Yes</option>
        </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        )
    }
}
