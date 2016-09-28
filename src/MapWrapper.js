import React, { Component } from 'react';
import $ from 'jquery';
import GoogleMap from 'google-map-react';

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPresent: this.props.coords != null
    };

    this.genLink = this.genLink.bind(this);
    this.genOptions = this.genOptions.bind(this);
    this.genGeocode = this.genGeocode.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      mapPresent: newProps.coords != null
    });
    if (newProps.coords != null) {
      $.get(this.genGeocode(newProps.coords), data => console.log(data.results));
    }
  }

  genLink(coords) {
  return `https://www.google.com/maps/@${coords.lat},${coords.lng},${this.props.zoom}z/data=!3m1!1e3`;
  }

  genGeocode(coords){
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${this.props.apiKey}`;
  }

  genOptions() {
    return {
      mapTypeId: 'hybrid',
      mapTypeControl: true,
    }
  }

  render(){
    if (!this.state.mapPresent) {
      return (
        <div>
          <p>Click the button to get a random Google map!</p>
          <p>The map will likely be centered somewhere in the continental United States.</p>
          <p>Check back soon for a version with a wider range of locations!</p>
        </div>
      );
    } else {
      return (
        <div>
          <div className="map">
            <GoogleMap
            bootstrapURLKeys={{key: this.props.apiKey}}
            center={this.props.coords}
            zoom={this.props.zoom}
            options={this.genOptions()} />
          </div>
          <p>Here is a<a target={"blank"} href={this.genLink(this.props.coords)}> link to the map</a>.</p>
          <p>Click the button to get a new random map!</p>
        </div>
      );
    }
  }
}
