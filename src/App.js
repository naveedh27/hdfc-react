import React, { Component } from 'react';
import Layout from './Layout/Layout';
import RouteHandler from './components/RouteHandler';
import './App.css';


import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Layout>
        <RouteHandler />
      </Layout>
    );
  }
}

export default App;
