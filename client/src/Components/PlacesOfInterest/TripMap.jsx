import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GoogleApiKey from './GoogleApiKey.js';
import scriptLoader from 'react-async-script-loader';
import PlacesOfInterestList from './PlacesOfInterestList.jsx';

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
    this.saveColor = this.saveColor.bind(this);
    this.state = {
      newMarker: false,
      places: []
    };
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    let self = this;
    if (isScriptLoadSucceed) {

      function createMarker(p) {
        let marker = new google.maps.Marker({
          map: self.map,
          position: new google.maps.LatLng(p.lat, p.lng)
        })
        let infowindow = new google.maps.InfoWindow({
          content: p.name
        })
        marker.addListener('click', () => {
          infowindow.open(self.map, marker);
        })
      }

      $.ajax({
        method: 'GET',
        url: `${HOSTNAME}/placesofinterest?tripId=${this.props.trip.id}`,
        success: (data) => {
          console.log('this was a successful get request', data);
          this.setState({
            places: data
          });

          let geoCoder = new google.maps.Geocoder;
          geoCoder.geocode({'address': this.props.trip.location}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {              
              var defaultLatLng = results[0].geometry.location;

              //create map items
              self.map = new google.maps.Map(self.refs.map, {
                center: {lat: defaultLatLng.lat(), lng: defaultLatLng.lng()},
                zoom: self.props.zoom
              });

              let searchbox = self.refs.searchbox;
              let AutoComplete = new google.maps.places.Autocomplete(searchbox);
              AutoComplete.bindTo('bounds', self.map);

              self.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchbox);

              self.infowindow = new google.maps.InfoWindow();
              let infowindowContent = self.refs.infowindow;
              self.infowindow.setContent(infowindowContent);

              self.marker = new google.maps.Marker({
                map: self.map
              });

              self.marker.addListener('click', () => {
                self.infowindow.open(self.map, self.marker);
              });

              self.marker.addListener('mouseover', () => {
                self.infowindow.open(self.map, self.marker);
              });

              self.marker.addListener('mouseout', () => {
                self.infowindow.open(self.map, self.marker);
              });

              data.forEach((place) => {
                createMarker(place);
              })

              AutoComplete.addListener('place_changed', () => {
                self.infowindow.close();
                let place = AutoComplete.getPlace();
                if (!place.geometry) {
                  return;
                }

                if (place.geometry.viewport) {
                  self.map.fitBounds(place.geometry.viewport);
                } else {
                  self.map.setCenter(place.geometry.location);
                  self.map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location
                self.marker.setPlace({
                  placeId: place.place_id,
                  location: place.geometry.location
                });
                self.marker.setVisible(true);

                infowindowContent.children['place-name'].textContent = place.name;
                // infowindowContent.children['place-id'].textContent = place.place_id;
                infowindowContent.children['place-address'].textContent = place.formatted_address;
                infowindowContent.children['place-phone'].textContent = place.formatted_phone_number;
                infowindowContent.children['place-website'].textContent = place.website;
                self.getPlaceInfo(place);
                self.infowindow.open(self.map, self.marker);
              });  
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
            }
          });

        },
        failure: (error) => {
          console.log('something went wrong grabbing the data', error);
        }


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
      method: 'PUT',
      url: `${HOSTNAME}/placesofinterest?placeId=${placeId}`,
      success: (data) => {
        console.log('status updated');
      },
      failure: (error) => {
        console.log('could not update status', error);
      }

    });
  }

  saveColor(color) {
    //need to put a PUT request here
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
      method: 'POST',
      url: HOSTNAME + '/placesofinterest',
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
      contentType: 'application/json',
      success: (data) => {
        console.log('place saved successfully!', data);
      },
      failure: (error) => {
        console.log('there was an error saving', error);
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
          saveColor={this.props.saveColor}
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
