import React from "react";
import PropTypes from "prop-types";

import GoogleApiKey from "./GoogleApiKey.jsx";
import scriptLoader from 'react-async-script-loader';

import { GeneralMarkerStyle, GeneralMarkerHoverStyle } from "./Markers/GeneralMarker.jsx";
import InputBoxForMap from './InputBoxForMap.jsx';


class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);

    this.state = {
      markers: [this.props.tripCoords],
      newMarker: false
    }
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      this.map = new google.maps.Map(this.refs.map, {
        center: this.props.tripCoords,
        zoom: this.props.zoom
      });
    let marker = new google.maps.Marker({
      position: this.props.tripCoords,
      icon: GeneralMarkerStyle,
      map: this.map
    })
    }
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

  toggleInfoBox() {
    this.setState({
      newMarker: !this.state.newMarker
    })
  }

  render() {
    // let markers = this.state.markers.map((item, index) => (
    //   <GeneralMarker key={index} lat={item.lat} lng={item.lng}/>
    // ))

    return (
      <div className="trip-map-container">
        <div ref="map">
        Loading...
        </div>
      </div>
    );
  }
}

TripMap.propTypes = {
  center: PropTypes.any,
  zoom: PropTypes.number,
  tripCoords: PropTypes.any
};

TripMap.defaultProps = {
  center: { lat: 37.783667, lng: -122.408885 },
  zoom: 15,
  tripCoords: { lat: 37.783667, lng: -122.408885 }
};

export default scriptLoader([GoogleApiKey])(TripMap);
