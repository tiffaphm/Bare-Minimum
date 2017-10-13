import React from 'react';
import PropTypes from 'prop-types';
const M_CIRCLE_WIDTH = 25;
const M_CIRCLE_HEIGHT = 25;

class GeneralMarker extends React.Component {
  render() {
    const GeneralMarkerStyle = {
      position: 'absolute',
      width: 25,
      height: 25,
      left: -10,
      top: -10,

      backgroundColor: 'red',
      textAlign: 'center',
      fontSize: 16,
      color: '#fff',
      paddingTop: 2,
      borderRadius: '50%',
      border: '1px solid white',
      boxShadow: '0 0.5px 0.5px rgba(0, 0, 0, 0.8)',
      zIndex: -1
    };

    const GeneralMarkerHoverStyle = {

    };

    return (
      <div className="map-marker" style={GeneralMarkerStyle}>
        <i className="fa fa-map-marker"></i>
      </div>
    )
  }
}

export default GeneralMarker;