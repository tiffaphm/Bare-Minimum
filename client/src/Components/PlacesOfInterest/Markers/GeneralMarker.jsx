import React from 'react';
import PropTypes from 'prop-types';
const M_CIRCLE_WIDTH = 25;
const M_CIRCLE_HEIGHT = 25;

class GeneralMarker extends React.Component {
  render() {
    const GeneralMarkerStyle = {
      position: 'absolute',
      width: M_CIRCLE_WIDTH,
      height: M_CIRCLE_HEIGHT,
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
      position: 'absolute',
      width: M_CIRCLE_WIDTH,
      height: M_CIRCLE_HEIGHT,
      left: -10,
      top: -10,

      backgroundColor: 'red',
      textAlign: 'center',
      fontSize: 16,
      color: '#fff',
      paddingTop: 2,
      borderRadius: '50%',
      border: '1px solid white',
      boxShadow: '0 0.5px 0.5px rgba(0, 0, 0, 0.8), 0 0 0 9px rgba(255, 255, 255, 0.7)',
      zIndex: -1
    };

    const MarkerStyle = this.props.$hover ? GeneralMarkerHoverStyle : GeneralMarkerStyle;

    return (
      <div className="map-marker" style={MarkerStyle}>
        <i className="fa fa-map-marker"></i>
      </div>
    )
  }
}

GeneralMarker.PropTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string,
  zIndex: PropTypes.number
};

GeneralMarker.defaultProps = {};

export default GeneralMarker;