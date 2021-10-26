import React from 'react';
import PageNavbar from './PageNavbar';
import OccupationRow from './OccupationRow';
import '../style/Occupations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Occupation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedOccupation: "",
			selectedState: "",
			occupations: [],
			states: [],
			locations: []
		};

		this.submitOccupation = this.submitOccupation.bind(this);
		this.submitState = this.submitState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}


	componentDidMount() {


		// Occupation
		// Send an HTTP request to the server.
    fetch("http://localhost:8081/occupations",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(occupationList => {
      if (!occupationList) return;
			let occupationDivs = occupationList.map((occupation, i) =>
				<option value={occupation.Abbreviation}> {occupation.OccupationList} </option>
			);

			this.setState({
				occupations: occupationDivs
			});
		});


		// States
		fetch("http://localhost:8081/states",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(stateList => {
      if (!stateList) return;
			let stateDivs = stateList.map((state, i) =>
				<option value={state.state_name}> {state.state_name} </option>
			);

			this.setState({
				states: stateDivs
			});
		});




	}

	handleChange(e) {
		this.setState({
			selectedOccupation: e.target.value
		});
	}

	handleStateChange(e) {
		this.setState({
			selectedState: e.target.value
		});
	}



	// OCCUPATION
	submitOccupation() {

		fetch("http://localhost:8081/locations/" + this.state.selectedOccupation + "/" + this.state.selectedState,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(locationList => {

			let locationDivs = locationList.map((location, i) =>

				<div key={i} className="occupationResults">

					<div className="City">{location.city}</div>
					<div className="Zipcode">{location.zipCode}</div>
					<div className="Occupation_Pop">{location.Occupation_Pop}</div>
					<div className="Median_Rent">{location.Median_Rent}</div>

				</div>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				locations: locationDivs
			});
		});
	}


	submitState() {

		fetch("http://localhost:8081/locations/" + this.state.selectedOccupation + "/" + this.state.selectedState,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(locationList => {

			let locationDivs = locationList.map((location, i) =>

				<div key={i} className="occupationResults">

					<div className="City">{location.city}</div>
					<div className="Zipcode">{location.zipCode}</div>
					<div className="Occupation_Pop">{location.Occupation_Pop}</div>
					<div className="Median_Rent">{location.Median_Rent}</div>

				</div>
			);

			//This saves our HTML representation of the data into the state, which we can call in our render function
			this.setState({
				locations: locationDivs
			});
		});
	}



	render() {

		return (
			<div className="Occupations">
				<PageNavbar active="Occupations" />

				<div className="container Occupations-container">

							<div className="jumbotron">
							<div className="h6">Please select an occupation and state to output the top 5 zipcodes of people in that
							occupation and the respective median rent. </div>
				      </div>

			      <div className="jumbotron">
			        <div className="h5">Occupation</div>
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedOccupation} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.occupations}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitOccupation}>Submit</button>
			          </div>
			        </div>
			      </div>



						<div className="jumbotron">
			        <div className="h5">State</div>
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedState} onChange={this.handleStateChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.states}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitState}>Submit</button>
			          </div>
			        </div>
			      </div>



			      <div className="jumbotron">
			        <div className="occupations-container">
			          <div className="occupation">
			            <div className="header"><strong>City</strong></div>
									<div className="header"><strong>ZipCode</strong></div>
			            <div className="header"><strong>Occupation (# of People)</strong></div>
									<div className="header"><strong>Median Rent ($US / Year)</strong></div>
			          </div>
			          <div className="occupations-container" id="results">
			            {this.state.locations}
			          </div>
			        </div>
			      </div>




			    </div>
			</div>
		);
	}
}
