import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MasterContainer from './containers/MasterContainer';
import MainPageContainer from './containers/MainPageContainer';
import NotFound from './containers/NotFound';

import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <MasterContainer>
        <Switch>
          <Route exact path="/" component={MainPageContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </MasterContainer>
    );
  }
}