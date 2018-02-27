import React, { Component } from 'react';
import Multi from "@khanacademy/react-multi-select";
import MultiSelect1 from "./mutiple1";
import MultiSelect2 from "./mutiple2.";
import MultiSelect3 from "./mutiple3";
import MultiSelect4 from "./mutiple4";

class Header extends Component {
  
    constructor(props){
      let role=[];
      let operation=[];
      let table=[];
      let colums=[];    
        super(props);
        this.state={
          first:false,
          second:false,
          third:false,
          forth:false,
          value:[]
        };
    }
    loadToEdit(){
      fetch('http://localhost:6300/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: localStorage.getItem('role'),
      operation: localStorage.getItem('operation'),
      table: localStorage.getItem('table'),
      colums: localStorage.getItem('colums'),
      code: localStorage.getItem('code')
      // this.props.loadtoEditor(this.role,this.operation,this.table,this.colums);
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.toString());
      })
      .catch((error) => {
        console.error(error);
      });
      
    }
    onClick2 = (d) => {
      this.child2.method(d) // do stuff
    }
    onClick3 = (d) => {
      this.child3.method(d) // do stuff
    }
    onClick4 = (t,d) => {
      this.child4.method(t,d) // do stuff
    }
    makeDisable(data , a) {
        this.setState({ 
          second: true,
          third:true,
          forth:true
        });
        if(a===2){
          this.role=data;
          localStorage.setItem('role',data);
          this.onClick2(true);
          this.onClick3(true);
          this.onClick4(true);
        }
        if(a===3){
          this.operation=data;
          localStorage.setItem('operation',data);
          this.onClick3(true);
          this.onClick4(true);
        }
        if(a===4){
          this.table=data;
          localStorage.setItem('table',data);          
          this.onClick4(this.table,true);
        } if(a===5) {
          let value;
          value=this.colums=data;
          localStorage.setItem('colums',data);          
          this.setState({value});      
        }

    }
    makeEnable(data , a) {
      let ar=[];
      this.setState({ 
        second:false,
        third:false,
        forth:false
      });
      if(a===2){
        ar=data.split(',');        
        this.role=data;
        localStorage.setItem('role',data);        
        this.onClick2(false);
        this.onClick3(false);
        // this.onClick4(false);
        this.onClick4(this.table,false);
        
      }
      if(a===3){
        ar=data.split(',');        
        this.operation=data;
        localStorage.setItem('operation',data);        
        this.onClick3(false);
        this.onClick4(false);
      }
      if(a===4){
        ar=data.split(',');        
        this.table=data;        
        localStorage.setItem('table',data);          
        this.onClick4(this.table,false);
      }
      if(a===5) {
        let value=[];
        ar=data.split(',');
        value=this.colums=ar;
        localStorage.setItem('colums',data);        
        this.setState({value});        
      }
  }
  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form style={{display:'flex'}}>
        <MultiSelect1 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} disable={this.state.first} />  
        <MultiSelect2 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} onRef={ref => (this.child2 = ref)} disable={this.state.second} />        
        <MultiSelect3 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} onRef={ref => (this.child3 = ref)} disable={this.state.third} />        
        <MultiSelect4 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} onRef={ref => (this.child4 = ref)} value={this.state.value} disable={this.state.forth} />                
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.loadToEdit.bind(this)} type="button">Save</button>
        </form>
      </div>
    </nav>    
    </div>
    );
  }
}
export default Header;

 