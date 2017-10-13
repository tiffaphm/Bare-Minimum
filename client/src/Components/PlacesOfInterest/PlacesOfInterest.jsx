import React from 'react';
import TripMap from './TripMap.jsx';

export class PlacesOfInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="points-of-interest-container">
        <TripMap />
      </div>
    )
  }
}

export default PlacesOfInterest;