import React from 'react';
import ColorCircle from './ColorCircle.jsx';

class PlacesOfInterestListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndDisable = this.saveAndDisable.bind(this);
    this.state = {
      saved: false
    }
  }

  componentDidMount() {
    console.log(this.props.place);
  }

  saveAndDisable(event) {
    this.props.savePlaceInfo(event);
    this.props.saveColor(color);
    this.setState({
      saved: !this.state.saved
    })
  }

  render() {

    let infoTextStyle = {
      margin: '0 0 0 15px',
      display: 'block',
      overflowWrap: 'break-word'
    }

    let iStyle = {
      float: 'left',
      marginTop: '3px'
    }

    let titleStyle = {
      fontSize: '16px'
    }

    let savedStyle = {
      float: 'right',
      fontSize: '14px',
      color: '#ccc',
      display: 'inline-block',
      padding: '2px 5px',
      marginTop: '5px',
      marginRight: '-20px'
    }

    let saveButton = this.props.place.status === 'saved' || this.state.saved ? <span className="fa fa-plus-circle" style={savedStyle} id={this.props.place.place_id}></span> : <span className="save-entry fa fa-plus-circle" id={this.props.place.place_id} onClick={this.saveAndDisable}></span>;
    let phoneNumber = this.props.place.formatted_phone_number ? <div><i className="fa fa-phone" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}>{this.props.place.formatted_phone_number}</span></div> : null;
    let website = this.props.place.website ? <div><i className="fa fa-external-link" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}><a href={this.props.place.website}>{this.props.place.website}</a></span></div> : null;

    return (
      <div className="list-group list-group-flush small">
        <div className="list-group-item">
          <span className="close-entry fa fa-times-circle" onClick={this.props.removePlaceFromList} id={this.props.place.place_id}></span>
          {saveButton}
          <div className="media">
            <ColorCircle saveColor={this.props.saveColor}/>
            <div className="media-body">
              <strong style={titleStyle}>{this.props.place.name}</strong><br/>
              <div className="text-muted smaller">
                <i className="fa fa-map-marker" style={iStyle} aria-hidden="true"></i> <span style={infoTextStyle}>{this.props.place.formatted_address}</span>
                {phoneNumber}
                {website}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

// PlacesOfInterestListEntry.proptypes = {
//   placeholder: PropTypes.string,
//   onPlacesChanged: PropTypes.func
// };

export default PlacesOfInterestListEntry;