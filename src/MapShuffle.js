import React, { Component } from 'react';
import MapControls from './MapControls.js';
import './MapShuffle.css';

class MapShuffle extends Component {

  render() {
    return (
      <div className="MapShuffle">
        <div className="header">
          <h1>MapShuffle</h1>
          <p>A geography discovery app.</p>
        </div>
        <div className="MapControls">
          <MapControls />
        </div>
      </div>
    );
  }
}

export default MapShuffle;
