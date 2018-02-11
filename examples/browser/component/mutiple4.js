import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
let   selected = [];
const FLAVOURS = [
	{ label: 'Select All', value: 'jamo' },
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },

];
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
			disabled: this.props.disable,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
		};
	},
	componentDidMount() {
		this.props.onRef(this)
	  },
	  componentWillUnmount() {
		this.props.onRef(undefined)
	  },
	  method(d) {
		this.setState({disabled:d});
	  },
	handleSelectChange (value) {
		selected=[];

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
			  console.log('You\'ve selected:', value);
			  this.disableIt;
		  } else{

		console.log('You\'ve selected:', this.state);
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
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
		return (
			<div className="section" >
				<Select style={{width:'15rem'}}
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your favourite(s)"
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