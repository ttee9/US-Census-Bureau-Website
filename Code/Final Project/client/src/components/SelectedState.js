import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class SelectedState extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header"><strong>Selected State:</strong> {this.props.selected} </div>
		);
	}

}
