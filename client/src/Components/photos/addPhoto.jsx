//Be able to drag a photo on a page
// on mouse down, add photo to database
//on click, find all images associated with the trip
// render random sized images

import React from 'react';
import reducer from '../../Reducers';
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';

const AddPhoto = (props) => (
  <div>
    // <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
    <button type="file" >Test</button>
  </div>
);

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(AddPhoto);

