import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GoogleApiKey from "./GoogleApiKey.js";
import scriptLoader from "react-async-script-loader";
import PlacesOfInterestList from "./PlacesOfInterestList.jsx";

// import GeneralMarker from "./Markers/GeneralMarker.jsx";
// import {
//   GeneralMarkerStyle,
//   GeneralMarkerHoverStyle
// } from "./Markers/GeneralMarker.jsx";
// import InputBoxForMap from "./InputBoxForMap.jsx";

let searchedPlace = {};
let mapStateToProps = state => {
  return { trip: state.trip, user: state.user };
};

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.getPlaceInfo = this.getPlaceInfo.bind(this);
    this.addPlaceInfoToList = this.addPlaceInfoToList.bind(this);
    this.removePlaceFromList = this.removePlaceFromList.bind(this);
    this.savePlaceInfo = this.savePlaceInfo.bind(this);
    // this.loadSavedPlaces = this.loadSavedPlaces.bind(this);
    this.state = {
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
      let marker;

      marker = new google.maps.Marker({
        map: this.map
      });

      marker.addListener("click", () => {
        infowindow.open(this.map, marker);
      });

      marker.addListener("mouseover", () => {
        infowindow.open(this.map, marker);
      });

      marker.addListener("mouseout", () => {
        infowindow.open(this.map, marker);
      });

      $.ajax({
      method: 'GET',
      url: `${HOSTNAME}/placesofinterest?tripId=${this.props.trip.id}`,
      success: (data) => {
        console.log("this was a successful get request", data);
        data.forEach((place) => {
          marker = new google.maps.Marker({
            map: this.map,
            position: {lat: place.lat, lng: place.lng}
          })
        });
      },
      failure: (error) => {
        console.log("something went wrong grabbing the data", error);
      }
    });

      // createMarker(place) {
      //   let placeLoc = place.geometry.location;
      //   let marker = new google.maps.Marker({
      //     map: this.map,
      //     position: place.geometry.location
      //   })
      // }

      AutoComplete.addListener("place_changed", () => {
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
        marker.setPlace({
          placeId: place.place_id,
          location: place.geometry.location
        });
        marker.setVisible(true);

        infowindowContent.children["place-name"].textContent = place.name;
        // infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children["place-address"].textContent =
          place.formatted_address;
        infowindowContent.children["place-phone"].textContent =
          place.formatted_phone_number;
        infowindowContent.children["place-website"].textContent = place.website;
        this.getPlaceInfo(place);
        infowindow.open(this.map, marker);
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
    });
  }

  removePlaceFromList(event) {
    let placeId = event.target.id;
    let copyOfPlaces = this.state.places.slice();

    for (let i = 0; i < copyOfPlaces.length; i++) {
      if (this.state.places[i].place_id === placeId) {
        copyOfPlaces.splice(i, 1);
        this.setState({
          places: copyOfPlaces
        });
      }
    }

    $.ajax({
      method: "PUT",
      url: `${HOSTNAME}/placesofinterest?placeId=${placeId}`,
      success: (data) => {
        console.log('status updated');
      },
      failure: (error) => {
        console.log('could not update status', error);
      }

    })
  }

  savePlaceInfo(event) {
    let placeId = event.target.id;
    let copyOfPlaces = this.state.places.slice();
    let placeToSave = {};

    for (let i = 0; i < copyOfPlaces.length; i++) {
      if (this.state.places[i].place_id === placeId) {
        placeToSave = copyOfPlaces.splice(i, 1)[0];
      }
    }

    $.ajax({
      method: "POST",
      url: HOSTNAME + "/placesofinterest",
      data: JSON.stringify({
        tripId: this.props.trip.id,
        userId: this.props.user.id,
        lat: placeToSave.geometry.location.lat(),
        lng: placeToSave.geometry.location.lng(),
        name: placeToSave.name,
        place_id: placeToSave.place_id,
        formatted_address: placeToSave.formatted_address,
        formatted_phone_number: placeToSave.formatted_phone_number,
        website: placeToSave.website,
        status: 'saved'
      }),
      contentType: "application/json",
      success: (data) => {
        console.log("place saved successfully!", data);
      },
      failure: (error) => {
        console.log("there was an error saving", error);
      }
    });
  }

  render() {
    return (
      <div className="trip-container row">
        <div className="trip-map-container col-md-8 col-sm-8">
          <input
            ref="searchbox"
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Add places to your list..."
          />
          <div ref="map" className="g-map" />
          <div ref="savedinfowindow">
            <span id="place-name" className="title" />
          </div>
          <div ref="infowindow">
            <span id="place-name" className="title" />
            <br />
            <span id="place-address" className="place-address" />
            <br />
            <span id="place-phone" className="place-phone" />
            <br />
            <span id="place-website" className="place-website" />
            <br />
          </div>
        </div>
        <PlacesOfInterestList
          places={this.state.places}
          removePlaceFromList={this.removePlaceFromList}
          savePlaceInfo={this.savePlaceInfo}
        />
      </div>
    );
  }
}

TripMap.propTypes = {
  user: PropTypes.object,
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

export default scriptLoader([GoogleApiKey])(connect(mapStateToProps)(TripMap));
