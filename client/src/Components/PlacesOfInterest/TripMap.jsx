import React from "react";
import PropTypes from "prop-types";

import GoogleApiKey from "./GoogleApiKey.jsx";
import scriptLoader from "react-async-script-loader";
import PlacesOfInterestList from './PlacesOfInterestList.jsx';

// import GeneralMarker from "./Markers/GeneralMarker.jsx";
// import {
//   GeneralMarkerStyle,
//   GeneralMarkerHoverStyle
// } from "./Markers/GeneralMarker.jsx";
// import InputBoxForMap from "./InputBoxForMap.jsx";

let searchedPlace = {};

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.getPlaceInfo = this.getPlaceInfo.bind(this);
    this.addPlaceInfoToList = this.addPlaceInfoToList.bind(this);
    this.removePlaceFromList = this.removePlaceFromList.bind(this);
    this.state = {
      markers: [this.props.tripCoords],
      newMarker: false,
      places: []
    };
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    let self = this;
    if (isScriptLoadSucceed) {
      this.map = new google.maps.Map(this.refs.map, {
        center: this.props.tripCoords,
        zoom: this.props.zoom
      });

      let searchbox = this.refs.searchbox;
      let AutoComplete = new google.maps.places.Autocomplete(searchbox);
      AutoComplete.bindTo("bounds", this.map);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchbox);

      let infowindow = new google.maps.InfoWindow();
      let infowindowContent = this.refs.infowindow;
      infowindow.setContent(infowindowContent);

      // let savedInfo = new google.maps.InfoWindow();
      // let savedInfoContent = this.refs.savedinfowindow;
      // savedInfo.setContent(savedInfoContent);

      this.marker = new google.maps.Marker({
        map: this.map
      });

      this.marker.addListener('click', () => {
        infowindow.open(this.map, this.marker);
      })

      this.marker.addListener('mouseover', () => {
        infowindow.open(this.map, this.marker);
      })

      this.marker.addListener('mouseout', () => {
        infowindow.open(this.map, this.marker);
      })

      AutoComplete.addListener('place_changed', () => {
        infowindow.close();
        let place = AutoComplete.getPlace();
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location
        this.marker.setPlace({
          placeId: place.place_id,
          location: place.geometry.location
        });
        this.marker.setVisible(true);

        infowindowContent.children['place-name'].textContent = place.name;
        // infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent = place.formatted_address;
        infowindowContent.children['place-phone'].textContent = place.formatted_phone_number;
        infowindowContent.children['place-website'].textContent = place.website;
        this.getPlaceInfo(place);
        infowindow.open(this.map, this.marker);
      });

    } // end of if statement
  } // end of componentwillreceiveprops

  getPlaceInfo(place) {
    searchedPlace = place;
    this.addPlaceInfoToList(searchedPlace);
  }

  addPlaceInfoToList(place) {
    let copyOfPlaces = this.state.places.slice();
    copyOfPlaces.push(place);
    this.setState({
      places: copyOfPlaces
    })
  }

  removePlaceFromList(event) {
    let placeId = event.target.id;
    let copyOfPlaces = this.state.places.slice();

    for (let i = 0; i < copyOfPlaces.length; i++) {
      if (this.state.places[i].place_id === placeId) {
        copyOfPlaces.splice(i, 1);
        this.setState({
          places: copyOfPlaces
        })
      }
    }


  }

  savePlaceInfo() {
    //post request to db
  }


  render() {
    // let markers = this.state.markers.map((item, index) => (
    //   <GeneralMarker key={index} lat={item.lat} lng={item.lng}/>
    // ))

    return (
      <div className="trip-container row">
        <div className="trip-map-container col-md-8 col-sm-8">
          <input
            ref="searchbox"
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Search..."
          />
          <div ref="map" className="g-map"/>
          <div ref="savedinfowindow">
            <span id="place-name" className="title" />
          </div>
          <div ref="infowindow">
            <span id="place-name" className="title" /><br />
            <span id="place-address" className="place-address" /><br />
            <span id="place-phone" className="place-phone" /><br />
            <span id="place-website" className="place-website" /><br />
          </div>
        </div>
          <PlacesOfInterestList places={this.state.places} removePlaceFromList={this.removePlaceFromList}/>
      </div>
    );
  }
}

TripMap.propTypes = {
  center: PropTypes.object,
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
