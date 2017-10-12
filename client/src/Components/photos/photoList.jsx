import React from 'react';
import reducer from '../../Reducers';
import PhotoEntry from './photoEntry.jsx';
import PhotoUpload from './photoUpload.jsX';

import { connect } from 'react-redux';
import $ from 'jquery';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

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

  render() {
    return (
      <div className="row">
        <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
        <PhotoUpload />
        {this.state.photos.map((photo, i) => <PhotoEntry photo={photo} key={i}/>)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PhotoList);

//// <AddPhoto />
