import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class StateInfoRow extends React.Component {
	constructor(props) {
		super(props);
	}

	
	render() {
		return (
			<div className="stateInfo">
				<div className="zip_city">{this.props.infoItem.zipcode}</div>
				<div className="zip_city">{this.props.infoItem.city}</div>
				<div className="year_price">{this.props.infoItem.yearmonth}</div>
				<div className="year_price">{this.props.infoItem.price}</div>
			</div>
		);
	}
}
