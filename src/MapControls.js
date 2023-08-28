import React, { Component } from 'react';
import {genZoom, genGeocode, genUsCoords, genGlobalCoords} from './map_utils.js';
import MapWrapper from './MapWrapper.js';
import fetch from 'node-fetch';
import _ from 'lodash';

import { blue700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const myTheme = getMuiTheme({
  fontFamily: 'Georgia',
  palette: {
    primary1Color: blue700
  }
});

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
    this.getCountryInfo = this.getCountryInfo.bind(this);

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

  usMap() {
    const { getStateInfo, usMap } = this;
    const coords = genUsCoords();

    const usMapResponse = data => {
      const { results } = data;
      const countryData = _.find(results, item => item.types.includes("country"));
      const usMapReturned = countryData !== undefined && countryData.formatted_address === "United States";

      usMapReturned ? getStateInfo(results, coords) : usMap();
    };

    fetch(genGeocode(coords))
      .then(res => res.json())
      .then(data => data.status === "OK" ? usMapResponse(data) : usMap())
      .catch(err => console.error(err));
  }

  globalMap(){
    const { getCountryInfo, globalMap } = this;
    const coords = genGlobalCoords();

    const globalMapResponse = data => {
      const { results }= data;
      const countryData = _.find(results, item => item.types.includes("country"));

      countryData !== undefined ? getCountryInfo(results, coords, countryData) : globalMap();
    };

    fetch(genGeocode(coords))
      .then(res => res.json())
      .then(data => data.status === "OK" ? globalMapResponse(data) : globalMap())
      .catch(err => console.error(err));
  }

  getStateInfo(results, coords){
    const stateData = _.find(results, item => item.types.includes("administrative_area_level_1"));

    if (stateData !== undefined) {
      this.setState({
        displayCoords: coords,
        displayLocation: stateData.formatted_address.replace(/, USA/i, '')
      });
    } else {
      this.usMap();
    }
  }

  getCountryInfo(results, coords, countryData) {
    if (countryData.formatted_address === "United States") {
      this.getStateInfo(results, coords);
    } else {
      this.setState({
        displayCoords: coords,
        displayLocation: countryData.formatted_address
      });
    }
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
        />
        <MuiThemeProvider muiTheme={myTheme}>
          <div className="map-options">

            <div className="map-checkboxes">
              <Checkbox
                label="Randomize zoom level"
                checked={this.state.randomZoom}
                onCheck={this.toggleZoom} />
              <Checkbox
                label="Only show continental U.S. maps"
                checked={this.state.usCoords}
                onCheck={this.toggleCoords} />
              </div>
              <RaisedButton className="map-button"
                label={this.state.displayCoords === null ? "Generate Map" : "New Map"}
                primary={true}
                onClick={this.newMap} />
          </div>
        </MuiThemeProvider>
        <div className="credits">
          <p>© Sam Richards 2018.
          Check out the <a target={"blank"} href={"https://github.com/samrrichards/MapShuffle"}>source code </a>on my Github.</p>
        </div>
      </div>
    );
  }
}
