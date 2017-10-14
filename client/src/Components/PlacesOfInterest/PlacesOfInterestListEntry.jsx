import React from 'react';

// .parent{
//   width: 150px;  
// }
// .parent, .text{
//   overflow: hidden;  
// }
// .text{
//   margin: 0;
// }
// .fa-example-icon{
//  float: left;
//   display: block;
// }

const PlacesOfInterestListEntry = (props) => {
  let infoTextStyle = {
    margin: '0 0 0 15px',
    display: 'block',
    overflowWrap: 'break-word'
  }

  let iStyle = {
    float: 'left',
    marginTop: '3px'
  }

  let imgStyle = {
    marginLeft: '-7px',
    marginRight: '0.7rem !important'
  }

  let titleStyle = {
    fontSize: '16px'
  }

    return (
      <div className="list-group list-group-flush small">
        <span className="list-group-item list-group-item-action" href="#">
        <span className="close-entry" onClick={props.removePlaceFromList} id={props.place.place_id}>x</span>
          <div className="media">
            <img className="d-flex mr-3 rounded-circle" style={imgStyle} src="http://placehold.it/45x45" alt=""/>
            <div className="media-body">
              <strong style={titleStyle}>{props.place.name}</strong><br/>
              <div className="text-muted smaller">
                <i className="fa fa-map-marker" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}>{props.place.formatted_address}</span>
                <i className="fa fa-phone" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}>{props.place.formatted_phone_number}</span>
                <i className="fa fa-external-link" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}><a href={props.place.website}>{props.place.website}</a></span>
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