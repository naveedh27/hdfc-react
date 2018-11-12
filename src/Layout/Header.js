import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class AppHeader extends Component {

	render() {

		return (
			<Header as='h1' content='KickStarter Browser' style={{ marginTop: '2.1em', paddingBottom: '2em' }} textAlign='center' />
		);
	}

} 