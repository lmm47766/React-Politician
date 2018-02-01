import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Politicians from "./components/Politician";
import Section from "./components/Section";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import "./App.css";

class App extends React.Component {  

  state={
    street:"",
    city: "",
    state:"",
    politiciansObj: [],
    nationalLevel:[],
    stateLevel:[],
    countyLevel:[],
    localLevel:[]
  };

  getInput = (street,city,state) => {
    let newstreet = street.split(" ").join("+");
    let newcity = city.split(" ").join("+");
    let newstate = state; 
    var apiKey = "AIzaSyDOqnV6Rm24od0pgTeOHbHUuZKJcEN8Dfk";
    var queryURLbase = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey;
    var newURL = queryURLbase + "&address=" + newstreet + "%20" + newcity + "%20" + newstate;


    axios.get(newURL)
    .then(info => {
      console.log(info.data)

      for (var i = 0; i < info.data.officials.length; i++) {
        var newObj={
          name: info.data.officials[i].name,
          contributions: [],
          party: info.data.officials[i].party ? info.data.officials[i].party : "N/A"
        }

        //Getting role and party
        for (var z = 0; z < info.data.offices.length; z++) {
          if (info.data.offices[z].officialIndices.indexOf(i) > -1) {
            newObj.role = info.data.offices[z].name
            newObj.level = info.data.offices[z].divisionId
          }
        }

        //Getting image
        if (info.data.officials[i].photoUrl) {
          newObj.img = info.data.officials[i].photoUrl
        }
        else if (info.data.officials[i].channels !== undefined){
          
          for (var x = 0; x < info.data.officials[i].channels.length; x++) {
            if (info.data.officials[i].channels[x].type === "Facebook") {
              newObj.img = "https://graph.facebook.com/" + info.data.officials[i].channels[x].id + "/picture?type=large&w%E2%80%8C%E2%80%8Bidth=720&height=720";        
            }
            else if (info.data.officials[i].channels[x].type === "Twitter") {
              newObj.img = "https://twitter.com/" + info.data.officials[i].channels[x].id + "/profile_image?size=original";
            }
          } 
        }
        else {
          newObj.img = "/images/electedOfficials.png"
        }         

        //Getting Links
        if (info.data.officials[i].channels){
          for (var y = 0; y < info.data.officials[i].channels.length; y++) {
            if (info.data.officials[i].channels[y].type === "Facebook") {
              newObj.fb = "https://" + info.data.officials[i].channels[y].type + ".com/" + info.data.officials[i].channels[y].id
            }
            if (info.data.officials[i].channels[y].type === "Twitter") {
              newObj.tw = "https://" + info.data.officials[i].channels[y].type + ".com/" + info.data.officials[i].channels[y].id
            }
            if (info.data.officials[i].channels[y].type === "YouTube") {
              newObj.yt = "https://" + info.data.officials[i].channels[y].type + ".com/" + info.data.officials[i].channels[y].id
            }
          }
        }
        this.state.politiciansObj.push(newObj);
      }
      this.getContributions(this.state.politiciansObj);
      
    })

    
  };

  getContributions = (array) => {
    var copy = array
    var length = copy.length;
    var coresUrl = "https://cors-anywhere.herokuapp.com/";


    for (var i = 0; i < length; i++) {

      ((i) => {

        var idUrl = `https://www.followthemoney.org/metaselect/json/entity.php?t=Candidate&name=${copy[i].name}&mode=json`;
        axios.get(coresUrl + idUrl)
          .then(data => {
            var t = "https://api.followthemoney.org/?c-t-eid=";
            var test = "&gro=d-eid,d-cci,d-ccb&APIKey=c2a22e874eef3431858439b49fae4aa1&mode=json"

            if (data.data[0]) {

              axios.get(t + data.data[0].id + test)
                .then(info => {

                  for (var j = 0; j < 3; j++) {
                    var cont = {
                      contributor: info.data.records[j].Contributor.Contributor,
                      amount: info.data.records[j].Total_$.Total_$
                    }
                    copy[i].contributions.push(cont);
                  }

                  //Set state until the last contribution is saved
                  if(i === length - 1 ) {
                    this.setState({politiciansObj: copy});
                    this.filter()
                  }
                })
            } 
          })


      })(i);
      

    }
    
    

  };

  filter = () => {
    var national=[];
    var state = [];
    var county = [];
    var local = [];

    this.state.politiciansObj.forEach( member => {

      if (member.level.includes('place')) {
        local.push(member)
      } 
      else if (member.level.includes('county')) {
        county.push(member)
      } 
      else if (member.level.includes('state')) {
        state.push(member)
      } 
      else {
        national.push(member)
      }


    });
    this.setState({
      nationalLevel:national,
      stateLevel:state,
      countyLevel:county,
      localLevel:local  
    })

  }

  componentDidUpdate(){
    console.log('**',this.state.politiciansObj)

  }
    


  render(){

 
    return (
        <div className='container'>
            <Header/>
            <Form getInput={this.getInput}/>
            <Section name={"National"} list={this.state.nationalLevel}/>
            <Section name={"State"} list={this.state.stateLevel}/>
            <Section name={"County"} list={this.state.countyLevel}/>
            <Section name={"Local"} list={this.state.localLevel}/>
            <Footer/>
        </div>
    )
  }

}  



export default App;
