import React from "react";
import GoogleApiKey from './GoogleApiKey.jsx';
import TripMap from './TripMap.jsx';

export class PlacesOfInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div className="map-container">
        <TripMap google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: GoogleApiKey
})(PlacesOfInterest);
