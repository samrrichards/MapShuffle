import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

export default class Shuffler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPresent: false,
      displayCoords: null,
      apiKey: 'AIzaSyAKvQ74lV2z8AuM6ERIearPxOPWBzuRVfo'
    }
    this.genMap = this.genMap.bind(this);
    this.genLink = this.genLink.bind(this);
    this.newCoords = this.newCoords.bind(this);
  }

  newCoords(){
    this.setState({
      mapPresent: true,
      displayCoords: this.genMap()
    });
  }

  genMap() {
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const getCoord = coord => coord >= 0 ? coord + randomInt(1, 99999999)/100000000 : coord - randomInt(1, 99999999)/100000000;
    const coordObj =  {lat: getCoord(randomInt(25, 49)), lng: getCoord(randomInt(-69, -125))};

    if (coordObj.lat < 40.54 && coordObj.lng > -73.94) {
      console.log("Long Island recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 38.45 && coordObj.lng > -75.05) {
      console.log("Maryland/Delaware recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 33.5 && coordObj.lng > -79) {
      console.log("South Carolina recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 29 && coordObj.lng < -82.77) {
      if (coordObj.lng > -95.1 || coordObj.lng < -100) {
        console.log("Gulf of Mexico recursion!");
        return this.genMap();
      } else if (coordObj.lat < 27.3) {
        console.log("Texas recursion!");
        return this.genMap();
      }
    }

    if (coordObj.lat > 45 && coordObj.lng > -83) {
      if (coordObj.lng < -70.8) {
        console.log("French Canada recursion!");
        return this.genMap();
      }
    }

    if (coordObj.lat < 31.33 && coordObj.lng < -105.94) {
      console.log("Sonora recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 32.5 && coordObj.lng < -114.82) {
      console.log("Baja recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 34.55 && coordObj.lng < -120.62) {
      console.log("Lompoc recursion!");
      return this.genMap();
    }

    if (coordObj.lat < 36.3 && coordObj.lng < -121.9) {
      console.log("Big Sur recursion!");
      return this.genMap();
    }

    return coordObj;
  }

  genLink(obj) {
  return `https://www.google.com/maps/@${obj.lat},${obj.lng},84664m/data=!3m1!1e3`;
  }

  render(){
    if (!this.state.mapPresent) {
      return (
        <div>
          <p>Click the button to get a random Google map!</p>
          <p>The map will likely be centered somewhere in the continental United States.</p>
          <p>Check back soon for a version with a wider range of locations!</p>
          <button onClick={this.newCoords}>Generate map</button>
          <div className="credits">
            <p>© 2016 Sam Richards<br/>
            Bootstrapped with <a target={"blank"} href={"https://github.com/facebookincubator/create-react-app"}>Create React App</a></p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="map">
            <GoogleMap
            bootstrapURLKeys={{key: this.state.apiKey}}
            center={this.state.displayCoords}
            zoom={8}
            options={{mapTypeId: 'hybrid'}}
            >
            </GoogleMap>
          </div>
          <p>Here is a<a target={"blank"} href={this.genLink(this.state.displayCoords)}> link to the map</a>.</p>
          <p>Click the button to get a new random map!</p>
          <button onClick={this.newCoords}>Generate new map</button>
          <div className="credits">
            <p>© Sam Richards 2016<br/>
            Bootstrapped with <a target={"blank"} href={"https://github.com/facebookincubator/create-react-app"}>Create React App</a></p>
          </div>
        </div>
      );
    }
  }
}
