import React from 'react';
import Slider from 'rc-slider';

export default class LightToggle extends React.Component {
  constructor(props) {
    super(props);

    // set state..
    this.state = {
      ...props,
    }
  }

  render() {
    return (
      <div className="color">
        <div className="name">
          {this.state.colorName}
        </div>
        <div>
          <Slider railStyle={ { ...this.state } } className="slider" />
        </div>
      </div>
    )
  }
}