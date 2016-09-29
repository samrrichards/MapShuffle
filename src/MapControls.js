import React, { Component } from 'react';
import {genZoom, genGeocode, genCoords, genGlobalCoords} from './map_utils.js';
import MapWrapper from './MapWrapper.js';
import $ from 'jquery';

export default class MapControls extends Component {
  constructor(){
    super();
    this.state= {
      randomZoom: false,
      usCoords: false,
      displayZoom: null,
      displayCoords: null,
      displayLocation: null,
      sfCoords: {lat: 37.7878783, lng:-122.4001403}
    };

    this.newMap = this.newMap.bind(this);

    this.globalMap = this.globalMap.bind(this);
    this.usMap = this.usMap.bind(this);

    this.toggleZoom = this.toggleZoom.bind(this);
    this.toggleCoords = this.toggleCoords.bind(this);
  }

  newMap(){
    this.setState({displayZoom : this.state.randomZoom ? genZoom() : 8});
    if (this.state.usCoords) {
      this.usMap();
    } else {
      this.globalMap();
    }
  }

  usMap(){
    let coords = genCoords();
    this.setState({
      isGlobal: false,
      displayCoords: coords,
      displayLocation: "United States"
    });
  }

  globalMap(){
    let coords = genGlobalCoords();
    $.get(genGeocode(coords), data => {
      if (data.status === "OK") {
        let results = data.results;
        let countryName = results[results.length - 1].formatted_address;
        if (results.length > 1 && countryName !== "Antarctica" && countryName !== "Greenland") {
          this.setState({
            isGlobal: true,
            displayCoords: coords,
            displayLocation: countryName
          });
        } else {
          this.globalMap();
        }
      } else {
        this.globalMap();
      }
    });
  }

  toggleZoom(){
    this.setState({
      randomZoom: !this.state.randomZoom
    });
  }

  toggleCoords(){
    this.setState({
      usCoords: !this.state.usCoords
    });
  }

  render() {
    return (
      <div>
        <MapWrapper
          zoom={this.state.displayZoom}
          coords={this.state.displayCoords}
          location={this.state.displayLocation}
          isGlobal={this.state.isGlobal}
          apiKey={'AIzaSyAKvQ74lV2z8AuM6ERIearPxOPWBzuRVfo'}
        />
        <div className="map-options">
          <button onClick={this.newMap}>Generate map</button><br/>
          <label className="map-toggle">
            <input
              type="checkbox"
              checked={this.state.randomZoom}
              onChange={this.toggleZoom}
            />
            Randomize zoom level
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.usCoords}
              onChange={this.toggleCoords}
            />
            Only show continental U.S. maps
          </label>
        </div>
        <div className="credits">
          <p>© Sam Richards 2016<br/>
          Bootstrapped with <a target={"blank"} href={"https://github.com/facebookincubator/create-react-app"}>Create React App</a>.<br/>
          Check out the <a target={"blank"} href={"https://github.com/samrrichards/MapShuffle"}>source code </a>on my Github.</p>
        </div>
      </div>
    );
  }
}
