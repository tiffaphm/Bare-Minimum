import React from "react";
import PropTypes from "prop-types";

import GoogleApiKey from "./GoogleApiKey.jsx";
import scriptLoader from 'react-async-script-loader';

// import GeneralMarker from "./Markers/GeneralMarker.jsx";
import { GeneralMarkerStyle, GeneralMarkerHoverStyle } from "./Markers/GeneralMarker.jsx";
import InputBoxForMap from './InputBoxForMap.jsx';


class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
    // this.markerHover = this.markerHover.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);

    this.state = {
      markers: [this.props.tripCoords],
      newMarker: false
    }
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    let self = this;
    if (isScriptLoadSucceed) {
      this.map = new google.maps.Map(this.refs.map, {
        center: this.props.tripCoords,
        zoom: this.props.zoom
      });

      let searchbox = this.refs.searchbox;
      let searchBox = new google.maps.places.SearchBox(searchbox);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchbox);

      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      })

      let markers = [];

      searchBox.addListener('places_changed', () => {
        let places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }
      })

      //   markers.forEach(marker => {
      //     marker.setMap(null);
      //   });
      //   markers = [];

      //   this.bounds = new google.maps.LatLngBounds();
      //   places.forEach(function(place) {
      //     if (!place.geometry) {
      //       console.log('returned place contains no geometry');
      //       return;
      //     }

      //     markers.push(new google.maps.Marker({
      //       map: this.map,
      //       title: place.name,
      //       position: place.geometry.location
      //     }));

      //     if (place.geometry.viewport) {
      //       bounds.union(place.geometry.viewport);
      //     } else {
      //       bounds.extend(place.geometry.location);
      //     }
      //   });
      //   map.fitBounds(bounds);
      // });
      

    } // end of if statement
  } // end of componentwillreceiveprops

  markerHover(marker) {
    console.log('hi');
  }

  addMarker(event) {
    console.log(window.google);
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
        <input id="pac-input" className="controls" type="text" placeholder="Search Box" ref="searchbox" />
        <div ref="map">
        </div>
      </div>
    );
  }
}

TripMap.propTypes = {
  center: PropTypes.any,
  latLng: PropTypes.array,
  zoom: PropTypes.number,
  tripCoords: PropTypes.any
};

TripMap.defaultProps = {
  center: { lat: 37.783667, lng: -122.408885 },
  latLng: [37.783667, -122.408885],
  zoom: 15,
  tripCoords: { lat: 37.783667, lng: -122.408885 }
};

export default scriptLoader([GoogleApiKey])(TripMap);
