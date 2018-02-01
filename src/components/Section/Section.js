import React from "react";
import "./Section.css";
import Politicians from "../Politician";

class Section extends React.Component {


	render(){

  var NationaList = this.props.list.map( politician =>         
    <Politicians
        key={politician.name}
        name={politician.name}
        role={politician.role}
        party={politician.party}
        image={politician.img}
        fb={politician.fb}
        contributions={politician.contributions}
      />) ; 


		return (
            <div className='row'>
              <h3>{this.props.name}</h3>
              <ul className="collapsible" data-collapsible="accordion">
                {NationaList}
              </ul>
            </div>
		)		
	}

}

export default Section;
