import React from 'react';

const PlacesOfInterestListEntry = (props) => {
    return (
      <div className="list-group list-group-flush small">
        <span className="list-group-item list-group-item-action" href="#">
          <div className="media">
            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt=""/>
            <div className="media-body">
              <strong>{props.place.name}</strong><br/>
              <input type="text" value="user notes"/>
              <div className="text-muted smaller">
                {props.place.formatted_address}<br/>
                {props.place.formatted_phone_number}<br/>
                <a href={props.place.website}>{props.place.website}</a>
              </div>
            </div>
          </div>
        </span>
      </div>
    )
};

// PlacesOfInterestListEntry.proptypes = {
//   placeholder: PropTypes.string,
//   onPlacesChanged: PropTypes.func
// };

export default PlacesOfInterestListEntry;