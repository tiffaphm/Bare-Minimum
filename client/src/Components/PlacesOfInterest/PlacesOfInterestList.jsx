import React from 'react';
import PropTypes from 'prop-types';

class PlacesOfInterestList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="places-list-container">
        <div className="card mb-3">
          <div className="card-header">
            list of places
          </div>
        </div>
      </div>
    )
  }
}

export default PlacesOfInterestList;