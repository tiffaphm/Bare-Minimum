import React from "react";
import PropTypes from "prop-types";

import GoogleApiKey from "./GoogleApiKey.jsx";
import GoogleMap from "google-map-react";

import GeneralMarker from "./Markers/GeneralMarker.jsx";
import { M_CIRCLE_WIDTH, M_CIRCLE_HEIGHT } from './Markers/GeneralMarker.jsx';

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);

    this.state = {
      markers: [this.props.tripCoords]
    }
  }

  getLocationForTrip() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     let pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.lo
    //     }
    //   })
    // }
  }

  addMarker(obj) {
    let lat = obj.lat;
    let lng = obj.lng;
    let coords = {
      'lat': lat,
      'lng': lng
    }

    let newCoords = this.state.markers.slice();
    newCoords.push(coords);
    this.setState({
      markers: newCoords
    })
  }

  removeMarker() {
    
  }

  render() {
    let markers = this.state.markers.map((item, key) => (
      <GeneralMarker key={key} lat={item.lat} lng={item.lng} onClick={this.removeMarker}/>
    ))
    return (
      <div className="trip-map-container">
        <GoogleMap
          bootstrapURLKeys={{ key: GoogleApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.addMarker}
        >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}

TripMap.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  tripCoords: PropTypes.any
};

TripMap.defaultProps = {
  center: [37.783667, -122.408885],
  zoom: 15,
  tripCoords: { lat: 37.783667, lng: -122.408885 }
};

export default TripMap;
