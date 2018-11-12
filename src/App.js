import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Home from './components/Home';
import './App.css';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
	render() {
		return (
    <Layout>
        <Home  />
    </Layout>
		);
	}
}

export default App;
