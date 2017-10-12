import React from 'react';
import reducer from '../../Reducers';
import { connect } from 'react-redux';
// import TripNavBar from '../tripDashboard/tripNavBar.jsx';
// import dummyData from '../tripDashboard/dummyData.js';

const PhotoEntry = (props) => (
  <div>
    <img className="photo-entry" src={props.photo.path}/>
  </div>
);

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(PhotoEntry);
