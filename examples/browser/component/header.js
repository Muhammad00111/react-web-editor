import React, { Component } from 'react';
import Multi from "@khanacademy/react-multi-select";
import MultiSelect1 from "./mutiple1";
import MultiSelect2 from "./mutiple2.";
import MultiSelect3 from "./mutiple3";
import MultiSelect4 from "./mutiple4";

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
          first:false,
          second:false,
          third:false,
          forth:false
        };
    }
    onClick2 = (d) => {
      this.child2.method(d) // do stuff
    }
    onClick3 = (d) => {
      this.child3.method(d) // do stuff
    }
    onClick4 = (d) => {
      this.child4.method(d) // do stuff
    }
    makeDisable(data , a) {
      this.props.loadtoEditor(data);      
        this.setState({ 
          second: true,
          third:true,
          forth:true
        });
        if(a===2){
          this.onClick2(true);
          this.onClick3(true);
          this.onClick4(true);
          
        }
    }
    makeEnable(data , a) {
      this.props.loadtoEditor(data);
      this.setState({ 
        second:false,
        third:false,
        forth:false
      });
      if(a===2){
        this.onClick2(false);
        this.onClick3(false);
        this.onClick4(false);
        
      }
  }
  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <a className="navbar-brand" href="#" style={{display:this.state.d}} >Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
      </ul>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form style={{display:'flex'}}>
        <MultiSelect1 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} disable={this.state.first} />  
        <MultiSelect2 makeEnable={this.makeEnable.bind(this)} makeDisable={this.makeDisable.bind(this)} onRef={ref => (this.child2 = ref)} disable={this.state} />        
        <MultiSelect3 onRef={ref => (this.child3 = ref)} disable={this.state.third} />        
        <MultiSelect4 onRef={ref => (this.child4 = ref)} disable={this.state.forth} />                
        </form>
      </div>
    </nav>    
    </div>
    );
  }
}
export default Header;

 