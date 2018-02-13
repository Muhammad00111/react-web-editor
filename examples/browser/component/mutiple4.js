import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
let   selected = [];
let FLAVOURS = [
	{ label: 'Select all colums', value: 'jamo' }
];
let s = FLAVOURS[0];
const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	disableIt(){
		this.props.makeDisable(a);
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
			disable:false,

		};
	},
	componentWillMount() {
		console.log('component rendered will')
	},
	componentDidMount() {
		this.props.onRef(this);
		console.log('component rendered');
	  },
	  componentWillUnmount() {
		this.props.onRef(undefined)
	  },
	  method(t,d) {
		if( t===true || t===false){

		}else{
		fetch(`http://localhost:6300/colum`, {
			method: 'post',
			body:JSON.stringify({table:t}),
			headers: new Headers({
			  'Content-Type': 'application/json'
			})
		  })
		  .then((response) => response.json())
		  .then((responseJson) => {
			FLAVOURS=responseJson;
			FLAVOURS.unshift(s);
			console.log(responseJson);
			console.log(FLAVOURS);
		this.setState({disable:d});	
		this.handleSelectChange(FLAVOURS[0].value);		
		  })
		  .catch((error) => {
			console.error(error);
		  });
		}
		
	  },
	  disable(data, a){
		this.props.makeDisable(data, a);
	},
	enable(data, a){
		this.props.makeEnable(data, a);
	},
	handleSelectChange (value) {
		console.log(value);
		let se = value.split(',');
		let found = se.find(function(element) {
			return element=== 'jamo';
		  });
		  if(found!==undefined){
			  let value=[];
			for (const i of FLAVOURS) {
				value.push(i['value']);
			}
			value.shift();
			  this.setState({ value });
			  this.disable(value, 5);
		  } else{
			this.setState({ value });			
			this.enable(value, 5);
		  }
	},
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	},
	render () {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
		return (
			<div className="section" >
				<Select style={{width:'19rem'}}
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your colums"
                    removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
  value={value}
				/>
			</div>
		);
	}
});
module.exports = MultiSelectField;