import React from 'react';
import PropTypes from 'prop-types';

import PlacesOfInterestListEntry from './PlacesOfInterestListEntry.jsx';

class PlacesOfInterestList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="places-list-container col-md-4 col-sm-4">
        <div className="card mb-3">
          <div className="card-header">
            list of places
          </div>
          {this.props.places.map((item, index) => 
            <PlacesOfInterestListEntry place={item} key={index} removePlaceFromList={this.props.removePlaceFromList}/>
          )}
        </div>
      </div>
    )
  }
}

export default PlacesOfInterestList;