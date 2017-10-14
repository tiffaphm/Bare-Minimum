import React from 'react';
import PropTypes from 'prop-types';

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
          <div className="list-group list-group-flush small">
            <a className="list-group-item list-group-item-action" href="#">
              <div className="media">
                <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt=""/>
                <div className="media-body">
                  <strong>Place Name</strong><br/>
                  description
                  <div className="text-muted smaller">
                    address
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default PlacesOfInterestList;