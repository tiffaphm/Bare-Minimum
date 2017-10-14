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
    // this.addMarker = this.addMarker.bind(this);
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

      class GeneralMarker extends google.maps.OverlayView {
        constructor(latlng, map, args) {
          super();
          this.latlng = latlng;
          this.args = args;
          this.setMap(map);
        }

        draw() {
          let self = this;
          let div = this.div;
          if (!div) {
            div = this.div = document.createElement('div');
            div.innerHTML = '<i class="fa fa-map-marker"></i>'
            div.className = 'general-marker';

            div.style.position = 'absolute';
            div.style.cursor = 'pointer';
            div.style.width = '25px';
            div.style.height = '25px';
            div.style.backgroundColor = '#C70039';
            div.style.textAlign = 'center';
            div.style.fontSize = '16px';
            div.style.color = '#fff';
            div.style.paddingTop = '2px';
            div.style.borderRadius = '50%';
            div.style.border = '1px solid white';
            div.style.boxShadow = '0 0.5px 0.5px rgba(0, 0, 0, 0.8)';
            div.style.zIndex = '-1';

            // if (typeof(self.args.marker_id) !== 'undefined') {
            //   div.markers.marker_id = self.args.marker_id;
            // }

            google.maps.event.addDomListener(div, 'click', () => {
              google.maps.event.trigger(self, 'click');
            });

            let panes = this.getPanes();
            panes.overlayImage.appendChild(div);
          };
          let point = this.getProjection().fromLatLngToDivPixel(this.latlng);

          if (point) {
            div.style.left = (point.x - 10) + 'px';
            div.style.top = (point.y - 20) + 'px';
          }
        }
      }

      google.maps.event.addDomListener(this.map, "click", (event) => {
        let marker = new GeneralMarker(event.latLng, this.map);
      });

    } // end of if statement
  } // end of componentwillreceiveprops

  // addMarker(obj) {
  //   let lat = obj.lat;
  //   let lng = obj.lng;
  //   let coords = {
  //     'lat': lat,
  //     'lng': lng
  //   }

  //   let newCoords = this.state.markers.slice();
  //   newCoords.push(coords);
  //   this.setState({
  //     markers: newCoords
  //   })
  // }

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
