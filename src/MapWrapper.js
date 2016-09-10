import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

export default class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPresent: this.props.coords != null
    };

    this.genLink = this.genLink.bind(this);
    this.genOptions = this.genOptions.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      mapPresent: newProps.coords != null
    });
    console.log(this.props);
    //console.log('Map Wrapper cwrp this.props.coords', this.props.coords);
    //console.log('Map Wrapper cwrp newProps.coords', newProps.coords);
    //console.log('Map Wrapper cwrp mapPresent: ', this.state.mapPresent);
  }

  genLink(obj) {
  return `https://www.google.com/maps/@${obj.lat},${obj.lng},84664m/data=!3m1!1e3`;
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
