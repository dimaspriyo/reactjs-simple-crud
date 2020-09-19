import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";
import {HttpGet, HttpPost} from './utils/Req'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      headerName: "Insert Data",
      status: "create",
    });
    
    
  }
  
  handleUpdateButton = (value) => {
    this.refs.form.handleTableClick(value,"update","Update Data");
  }
  
  handleDeleteButton = (value) => {
    this.refs.form.handleTableClick(value,"delete","Delete Data");
  }
  
  handleSubmit = () => {
    this.refs.table.updateTable();
  
}

render() {
  return (
    
    <div className="container-fluid">
    <Header  />
    <div className="row">
    <div className="col-md-6">
    <Form headerName={this.state.headerName} ref="form" onChange={() => this.handleSubmit()}/>
    </div>
    <div className="col-md-6">
    <Table
    ref="table"
    onUpdateButton={(value) => this.handleUpdateButton(value)}
    onDeleteButton={(value) => this.handleDeleteButton(value)}
    />
    </div>
    </div>
    </div>
    );
  }
}
