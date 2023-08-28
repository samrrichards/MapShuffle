import React from 'react';
import MapControls from './MapControls.js';

import './MapShuffle.css';

const MapShuffle = () => (
  <div className="MapShuffle">
    <div className="header">
      <h1 className="title">MapShuffle</h1>
      <p className="subtitle">A geography discovery app.</p>
    </div>
    <div className="MapControls">
      <MapControls  apiKey={process.env.REACT_APP_API_KEY} />
    </div>
  </div>
);

export default MapShuffle;
