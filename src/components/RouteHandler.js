import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './Home'


export default class RouteHandler extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}