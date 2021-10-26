import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ZipInfoRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="zipinfoResults">
				<div className="zip">{this.props.zip}</div>
				<div className="city">{this.props.city}</div>
				<div className="income">&#160;&#160;&#160;&#160;&#160;{this.props.income}</div>
				<div className="w_30">&#160;&#160;&#160;&#160;&#160;{this.props.w_30}</div>
				<div className="w_60">&#160;&#160;&#160;&#160;&#160;{this.props.w_60}</div>
			</div>
		);
	}
}
