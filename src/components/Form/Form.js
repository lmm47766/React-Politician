import React from "react";
import "./Form.css";

class Form extends React.Component {  

	  state={
	    street:"",
	    city: "",
	    state:""
	  };

	  clicked = (event) => {
	  	event.preventDefault();
	  	this.props.getInput(this.state.street,this.state.city,this.state.state)

	  };

	  clear = (event) => {
	  	event.preventDefault();
	  	this.setState({
		    street:"",
		    city: "",
		    state:""	
	  	})
	  	this.props.getInput(this.state.street,this.state.city,this.state.state)

	  };

	  handleInputChange = event => {
	     this.setState({ [event.target.name]: event.target.value })
	  };


	render(){

	return (

			<form className='row'>
			<div className="input-field col s3">
				<input onChange={this.handleInputChange} id="street" name='street' type="text" className="validate"/>
				<label htmlFor="street">Street</label>
			</div>
			<div className="input-field col s3">
				<input onChange={this.handleInputChange} id="city" name='city' type="text" className="validate"/>
				<label htmlFor="city">City</label>
			</div>
			<div className="input-field col s2">
				<input onChange={this.handleInputChange} id="state" name='state' type="text" className="validate"/>
				<label htmlFor="state">State</label>
			</div>	
			<button onClick={this.clicked} className='btn blue col s2'>Find Politicians</button>
					
			</form>

			)


	}



};

export default Form;