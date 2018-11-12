import React, { Component } from 'react';
import LightToggle from './LightToggle';
import FanToggle from './FanToggle';

export default class MainPage extends Component {
  render() {
    // Éléments visuels sans component:
    // - la température
    // - le pourcentage

    // Component global pour changer les couleurs
    //  Component pour changer la couleur blanche
    //  Component pour changer la couleur rouge
    //  Component pour changer la couleur bleue

    // Component global pour changer les fans
    //  Component pour changer la fan 1
    //  Component pour changer la fan 2

    return (
      <div className="main-page">
        <div className="components">
          <div className="first-section">
            <p id="temperature">15°C</p>
            <div className="colors">
              <LightToggle color="white" colorName="blanc" id={1} />
              <LightToggle color="blue" colorName="bleu" id={2} />
              <LightToggle color="red" colorName="rouge" id={3} />
            </div>
          </div>
          <div className="second-section">
            <p id="percentage">50%</p>
            <div className="fans">
              <FanToggle name="Fan1" id={1} />
              <FanToggle name="Fan2" id={2} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}