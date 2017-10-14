import React from 'react';

class PlacesOfInterestListEntry extends React.Component {

  saveDataForPlaceOfInterest() {
    //post request here
    console.log('kweh! saved!')
  }

  render() {
    return (
      <div className="list-group list-group-flush small">
        <a className="list-group-item list-group-item-action" href="#">
          <div className="media">
            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt=""/>
            <div className="media-body">
              <strong>Place Name</strong><br/>
              description
              <div className="text-muted smaller">
                address · phone · web
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }
};

// PlacesOfInterestListEntry.proptypes = {
//   placeholder: PropTypes.string,
//   onPlacesChanged: PropTypes.func
// };

export default PlacesOfInterestListEntry;