import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class StateButton extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="StateButton" id={this.props.id} onClick={this.props.onClick}>
			{this.props.state_name}
			</div>
		);
	}
}
