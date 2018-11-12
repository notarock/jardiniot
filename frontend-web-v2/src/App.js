import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MasterContainer from './containers/MasterContainer';
import MainPageContainer from './containers/MainPageContainer';
import NotFound from './containers/NotFound';
import About from './components/About';

import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';

export default class App extends Component {
  render() {
    return (
      <MasterContainer>
        <Switch>
          <Route exact path="/" component={MainPageContainer} />
          <Route exact path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </MasterContainer>
    );
  }
}