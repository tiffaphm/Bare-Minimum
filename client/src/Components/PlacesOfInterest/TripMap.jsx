import React from "react";
import PropTypes from "prop-types";

import GoogleApiKey from "./GoogleApiKey.jsx";
import GoogleMap from "google-map-react";

import GeneralMarker from "./Markers/GeneralMarker.jsx";

// const loadJS = (src) => {
//     var ref = window.document.getElementsByTagName("script")[0];
//     var script = window.document.createElement("script");
//     script.src = src;
//     script.async = true;
//     ref.parentNode.insertBefore(script, ref);
// }

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.getLatLng = this.getLatLng.bind(this);

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

  getLatLng(obj) {
    let lat = obj.lat;
    let lng = obj.lng;
    let coords = {
      'lat': lat,
      'lng': lng
    }
  }

//   renderMarker(map, maps, coords) {
// renderMarkers(map, maps) {
//   let marker = new maps.Marker({
//     position: myLatLng,
//     map,
//     title: 'Hello World!'
//   });
// }
//   }

  render() {
    return (
      <div className="trip-map-container">
        <GoogleMap
          bootstrapURLKeys={{ key: GoogleApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.getLatLng}
          onGooglApiLoaded={({map, maps}) => console.log(map, maps)}
        >
            <GeneralMarker lat={this.props.tripCoords.lat} lng={this.props.tripCoords.lng} />
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
