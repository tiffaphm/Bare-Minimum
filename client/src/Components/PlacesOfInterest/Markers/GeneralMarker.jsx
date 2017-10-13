import React from 'react';
import PropTypes from 'prop-types';

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
      border: '1px solid white'
    };

    return (
      <div style={GeneralMarkerStyle}>
        <i className="fa fa-map-marker"></i>
      </div>
    )
  }
}

export default GeneralMarker;