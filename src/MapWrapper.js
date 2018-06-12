import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { Image, Panel} from 'react-bootstrap/lib';
import introPic from './assets/intro-pic.jpg';

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
      scaleControl: true
    }
  }

  render(){
    if (!this.state.mapPresent) {
      return (
        <div className="info">
          <Image className='intro-pic' style={{transform: 'scale'}} src={introPic} alt='' />
          <p>Click the button to get a random Google map!</p>
        </div>
      );
    } else {
      return (
        <div>
          <div className="map">
            <Panel className="map-panel" style={{transform: 'scale'}}>
              <div className="map-container">
                <GoogleMap
                bootstrapURLKeys={{key: this.props.apiKey}}
                center={this.props.coords}
                zoom={this.props.zoom}
                options={this.genOptions()} />
              </div>
            </Panel>
          </div>
          <div className="info">
            <p className="info-text"> Welcome to {this.props.location}!</p>
            <p className="info-link"><a target={"blank"} href={this.genLink(this.props.coords)}>Click here</a> to open the map in another tab.</p>
          </div>
        </div>
      );
    }
  }
}
