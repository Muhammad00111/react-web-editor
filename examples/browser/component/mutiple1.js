import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
let   selected = [];
let ok = false;
let FLAVOUR=[];
let FLAVOURS = [
	{ label: 'Select All', value: 'jamo' }

];
const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: this.props.disable,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
			ok: false
		};
	},
	componentWillMount() {
		let s = FLAVOURS[0];
		fetch('http://localhost:6300/role')
		.then((response) => response.json())
		.then((responseJson) => {
		  FLAVOURS = responseJson;
		  FLAVOURS.unshift(s);
		  ok=true;
		  this.setState({ ok });
		  this.handleSelectChange(FLAVOURS[0].value);
		})
		.catch((error) => {
		  console.error(error);
		});	
	},
	disable(data, a){
		this.props.makeDisable(data, a);
	},
	enable(data, a){
		this.props.makeEnable(data, a);
	},
	handleSelectChange (value) {
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
			  this.disable(value, 2);
		  } else{
			this.enable(value, 2);
		this.setState({ value });
		  }


	// }
	
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
		if(ok===true){
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = FLAVOURS;
		return (
			<div className="section" >
				<Select style={{width:'19rem'}}
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select Role(s)"
                    removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
  					value={value}
				/>
			</div>
		);
	} else {
		return(
			<div></div>
		)
	}
	
	}
});
module.exports = MultiSelectField;