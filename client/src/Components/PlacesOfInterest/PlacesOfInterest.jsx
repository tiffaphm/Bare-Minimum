import React from 'react';
import TripMap from './TripMap.jsx';
import { connect } from 'react-redux';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';
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
        <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
        <TripMap />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PlacesOfInterest);