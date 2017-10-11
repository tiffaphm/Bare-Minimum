import React from 'react';
import reducer from '../../Reducers';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import PhotoEntry from './photoEntry.jsX';

import { connect } from 'react-redux';
import $ from 'jquery';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: ['./images/np1.jpg', '/images/np2.jpg']
    };

    // this.getPhotos = this.getPhotos.bind(this);
  }

  // componentDidMount () {
  //   this.getPhotos();
  //   // this.getUsers();
  // }

  // getPhotos () {
  //   const options = { tripId: this.props.trip.id };
  //   $.ajax({
  //     url: SERVER_URL + '/expense',
  //     data: options,
  //     method: 'GET',
  //     success: function(photos) {
  //       this.setState({ photos: photoss });
  //     }
  //   });
  // }

  // findUser (userId) {
  //   for (var user of this.state.usersOnTrip) {
  //     if (user.id === userId) {
  //       return user.name;
  //     }
  //   }
  // }

  render() {
    return (
      <Col md={8} mdOffset={2}>
        <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
        <div>
          {this.state.photos.map((photo, i) => <PhotoEntry photo={photo} key={i}/>)}
        </div>
      </Col>
    );
  }
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(PhotoList);
