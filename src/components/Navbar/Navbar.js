import React from "react";
import "./Navbar.css";

const Navbar = props => {
	console.log(props)

	const styles = {
		color: {
			color: props.color,
		}
	};

	return(
    <nav>
      <div className="nav-wrapper">
        <ul id="nav-mobile">
          <li><a className='home' href="/">Clicky Game</a></li>
          <li style={styles.color}>{props.answer}</li>
          <li>Score: {props.score} | Top Score: {props.topScore}</li>
        </ul>
      </div>
    </nav> 
	)
};

export default Navbar;
