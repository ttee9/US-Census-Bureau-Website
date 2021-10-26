import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="occupationResults">

				<div className="City">City</div>
				<div className="Zipcode">ZipCode</div>
				<div className="Occupation_Pop">Occupation_Pop</div>
				<div className="Median_Rent">Median_Rent</div>

			</div>
		);
	}
}
