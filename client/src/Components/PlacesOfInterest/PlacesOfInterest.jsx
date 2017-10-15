import React from 'react';
import TripMap from './TripMap.jsx';
import { connect } from 'react-redux';
// import CreateTrip from '../Components/NavBarComponents/createTrip.jsx';


let mapStateToProps = (state) => {
  return { trip: state.trip, user: state.user };
};

class PlacesOfInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="places-of-interest-container">
        <TripMap />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PlacesOfInterest);