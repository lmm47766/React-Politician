import React from "react";
import "./Politician.css";

const Politician = props => (

	<li>
		<div className="collapsible-header">
		<i className=
		{props.party==="Republican"?"material-icons red-text text-darken-3": (props.party==="Democratic"?"material-icons blue-text text-darken-3": "material-icons green-text text-darken-3")}> 
		account_balance</i>
		{props.name} - {props.party}
		</div>
		<div className="collapsible-body">
			<h3>{props.role}</h3>
			<img alt={props.name} src={props.image}/>
			<h5>Contributions</h5>

		</div>
	</li>
);

export default Politician;
   