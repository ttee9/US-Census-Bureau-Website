import React from 'react';
import PageNavbar from './PageNavbar';
import ZipInfoRow from './ZipInfoRow';
import '../style/ZipInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ZipInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			zip: "",
			zipItem: [],
			relatedZipItems: []
		}

		this.handleZipChange = this.handleZipChange.bind(this);
		this.submitZip = this.submitZip.bind(this);
	}

	handleZipChange(e) {
		this.setState({
			zip: e.target.value
		});
	}

	submitZip() {
		fetch("http://localhost:8081/zipinfo/" + this.state.zip,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(zipList => {
			console.log(zipList);
			let zipDivs = zipList.map((zipObj, i) =>
			<ZipInfoRow zip = {zipObj.zip} city={zipObj.city} income={zipObj.income} w_30={zipObj.w_30} w_60={zipObj.w_60} />
			);

			this.setState({
				zipItem: zipDivs
			});
		}, err => {
			console.log(err);
		});

		fetch("http://localhost:8081/relatedzipinfo/" + this.state.zip,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(zipList => {
			console.log(zipList);
			let zipDivs = zipList.map((zipObj, i) =>
			<ZipInfoRow zip = {zipObj.zip} city={zipObj.city} income={zipObj.income} w_30={zipObj.w_30} w_60={zipObj.w_60} />
			);

			this.setState({
				relatedZipItems: zipDivs
			});
		}, err => {
			console.log(err);
		});
	}


	render() {

		return (
			<div className="ZipInfo">
				<PageNavbar active="zipinfo" />
			    <div className="container zipinfo-container">


						<div className="jumbotron">
							<div className="h6">
								Please enter a zip code to output the average commute time and median income.
							</div>
					</div>


			    	<div className="jumbotron">
			    		<div className="h5">Zipinfo</div>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter A Zip" value={this.state.zip} onChange={this.handleZipChange} id="zip" className="zip-input"/>
			    			<button id="submitZipBtn" className="submit-btn" onClick={this.submitZip}>Submit</button>
			    		</div>
										    		<br></br>
			    		<div className="header-container">
			    			<div className="headers">
								<div className="headerZip"><strong>Zip</strong></div>
			    				<div className="headerCity"><strong>City</strong></div>
			    				<div className="header"><strong>Median Income ($US / Year)</strong></div>
					            <div className="header"><strong>Commute Under 30 Mins (%)</strong></div>
					            <div className="header"><strong>Commute 30 - 60 Mins (%)</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.zipItem}
			    		</div>

						<br></br>
						<br></br>
						<strong>Top 10 areas in this city:</strong>
						<br></br>
						<br></br>
						<div className="results-container" id="results">
			    			{this.state.relatedZipItems}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}
