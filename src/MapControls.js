import React, { Component } from 'react';
import {genZoom, genCoords} from './map_utils.js';
import MapWrapper from './MapWrapper.js';

export default class MapControls extends Component {
  constructor(){
    super();
    this.state= {
      randomZoom: false,
      usCoords: false,
      displayZoom: null,
      displayCoords: null,
      storedZoom: 8,
      storedCoords: genCoords(),
    };

    this.newMap = this.newMap.bind(this);

    this.toggleZoom = this.toggleZoom.bind(this);
    this.toggleCoords = this.toggleCoords.bind(this);
  }

  shouldComponentUpdate() {
    this.setState({
      storedZoom: this.state.randomZoom ? genZoom() : 8,
      storedCoords: this.state.usCoords ? {lat: 37.7672048, lng:-122.4473408} : genCoords()
    });
    console.log("Map Controls scu randomZoom: ", this.state.randomZoom);
    console.log("Map Controls scu usCoords: ", this.state.usCoords);
    console.log("Map Controls scu zoom: ", this.state.storedZoom);
    console.log("Map Controls scu coords: ", this.state.storedCoords);
    return true;
  }

  newMap(){
    this.setState({
      displayZoom: this.state.storedZoom,
      displayCoords: this.state.storedCoords
    });
    console.log("Map Controls newMap zoom: ", this.state.displayZoom);
    console.log("Map Controls newMap coords: ", this.state.displayCoords);
  }

  toggleZoom(){
    this.setState({randomZoom: !this.state.randomZoom});
    console.log()
  }

  toggleCoords(){
    this.setState({usCoords: !this.state.usCoords});
  }

  render() {
    return (
      <div>
        <MapWrapper
          zoom={this.state.displayZoom}
          coords={this.state.displayCoords}
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
