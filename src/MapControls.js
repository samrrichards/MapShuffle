import React, { Component } from 'react';
import {genZoom, genGeocode, genUsCoords, genGlobalCoords} from './map_utils.js';
import MapWrapper from './MapWrapper.js';
import $ from 'jquery';
import _ from 'lodash';

export default class MapControls extends Component {
  constructor(){
    super();
    this.state= {
      randomZoom: false,
      usCoords: false,
      displayZoom: null,
      displayCoords: null,
      displayLocation: null
    };

    this.newMap = this.newMap.bind(this);

    this.globalMap = this.globalMap.bind(this);
    this.usMap = this.usMap.bind(this);

    this.getStateInfo = this.getStateInfo.bind(this);

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

  getStateInfo(results, coords){
    let stateData = _.find(results, item => item.types.includes("administrative_area_level_1"));

    if (stateData === undefined) {
      this.usMap();
    } else {
      this.setState({
        displayCoords: coords,
        displayLocation: stateData.formatted_address.replace(/, USA/i, '')
      });
    }
  }

  usMap() {
    let coords = genUsCoords();
    $.get(genGeocode(coords), data => {
      if (data.status === "OK") {
        let results = data.results;
        let countryName = _.find(results, item => item.types.includes("country")).formatted_address || false;
        if (countryName && countryName === "United States") {
          this.getStateInfo(results, coords);
        } else {
          this.usMap();
        }
      } else {
        this.usMap();
      }
    });
  }

  globalMap(){
    let coords = genGlobalCoords();
    $.get(genGeocode(coords), data => {
      if (data.status === "OK") {
        let results = data.results;
        let countryName = _.find(results, item => item.types.includes("country")).formatted_address || false;
        if (countryName && countryName !== "Antarctica" && countryName !== "Greenland") {
          if (countryName === "United States") {
            this.getStateInfo(results, coords);
          } else {
            this.setState({
              displayCoords: coords,
              displayLocation: countryName
            });
          }
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
