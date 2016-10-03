import React, { Component } from 'react';
import MapControls from './MapControls.js';
import './MapShuffle.css';
import $ from 'jquery';
import cryptoJS from 'crypto-js';

class MapShuffle extends Component {
  constructor(){
    super();
    this.state = {
      keyEndpoint: 'http://localhost:8000',
      apiKey: null,
    }

    this.decryptKey = this.decryptKey.bind(this);
  }

  componentWillMount() {
    $.get(this.state.keyEndpoint, data => {
      this.setState({apiKey: this.decryptKey(data)});
    });
  }

  decryptKey(data) {
    let decrypted = cryptoJS.AES.decrypt(data, 'Tago Mago');
    return decrypted.toString(cryptoJS.enc.Utf8);
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
