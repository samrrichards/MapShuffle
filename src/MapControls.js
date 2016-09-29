import React, { Component } from 'react';
import {genZoom, genCoords, genGlobalCoords} from './map_utils.js';
import MapWrapper from './MapWrapper.js';
import async from 'async';
import $ from 'jquery';

export default class MapControls extends Component {
  constructor(){
    super();
    this.state= {
      randomZoom: false,
      usCoords: false,
      displayZoom: null,
      displayCoords: null,
      displayCountry: null,
      sfCoords: {lat: 37.7878783, lng:-122.4001403}
    };

    this.newMap = this.newMap.bind(this);
    this.newGeocodes = this.newGeocodes.bind(this);

    this.toggleZoom = this.toggleZoom.bind(this);
    this.toggleCoords = this.toggleCoords.bind(this);

    this.genGeocode = this.genGeocode.bind(this);
    this.fetchGeocode = this.fetchGeocode.bind(this);
  }

  newGeocodes(){
    let coordArray = [];

    for (let i = 0; i < 3; i++) {
      coordArray.push(genGlobalCoords());
    }

    return async.map(coordArray, item => this.genGeocode(item));
  }

  newMap(){
    this.setState({displayZoom : this.state.randomZoom ? genZoom() : 8});
    if (this.state.usCoords) {
      this.setState({
        displayCoords: genCoords(),
        displayCountry: "United States"
      });
    } else {
      this.fetchGeocode();
    }
  }

  genGeocode(coords){
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyAKvQ74lV2z8AuM6ERIearPxOPWBzuRVfo`;
  }

  fetchGeocode(){
    let coords = genGlobalCoords();
    //console.log(coords);
    $.get(this.genGeocode(coords), data => {
      if (data.status === "OK") {
        let results = data.results;
        let countryName = results[results.length - 1].formatted_address;
        if (results.length > 1 && countryName !== "Antarctica" && countryName !== "Greenland") {
          this.setState({
            displayCoords: coords,
            displayCountry: countryName
          });
        } else {
          this.fetchGeocode();
        }
      } else {
        this.fetchGeocode();
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
          country={this.state.displayCountry}
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
