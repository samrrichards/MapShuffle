import React, { Component } from 'react';
import MapControls from './MapControls.js';
import './MapShuffle.css';
import $ from 'jquery';

class MapShuffle extends Component {
  constructor(){
    super();
    this.state = {
      keyEndpoint: 'http://localhost:8000',
      apiKey: null,
    }
  }

  componentWillMount() {
    $.get('http://localhost:8000', data => {
      this.setState({apiKey: data});
    });
  }

  render() {
    return (
      <div className="MapShuffle">
        <div className="header">
          <h1>MapShuffle</h1>
          <p>A geography discovery app.</p>
        </div>
        <div className="MapControls">
          <MapControls
            apiKey={this.state.apiKey}
          />
        </div>
      </div>
    );
  }
}

export default MapShuffle;
