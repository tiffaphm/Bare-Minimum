import React from 'react';
import PropTypes from 'prop-types';

class GeneralMarker extends React.Component {
  render() {
    const GeneralMarkerStyle = {
      position: 'absolute',
      width: 20,
      height: 20,
      left: -10,
      top: -10,

      backgroundColor: 'red',
      textAlign: 'center',
      fontSize: 14,
      color: '#fff',
      paddingTop: 2,
      borderRadius: 50
    };

    return (
      <div style={GeneralMarkerStyle}>
        <i className="fa fa-map-marker"></i>
      </div>
    )
  }
}

export default GeneralMarker;