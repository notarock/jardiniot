import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class Master extends Component {
  render() {
    return (
      <div className="custom-container">
        <Header />

        {this.props.children}

        <Footer />
      </div>
    );
  }
}