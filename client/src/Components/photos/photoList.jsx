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
      photos: []
    };

    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount () {
    this.getPhotos();
    // this.getUsers();
  }

  getPhotos () {
    // const options = { tripId: this.props.trip.id };
    $.ajax({
      url: HOSTNAME + '/photos',
      // data: options,
      method: 'GET',
      success: (photos) => {
        // console.log('received photos', photos);
        this.setState({photos: photos });
      },
      error: (err) => {
        console.log('error while getting photos (client)', err);
      } 
    });
  }

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
