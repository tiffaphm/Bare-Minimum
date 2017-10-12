import React from 'react';
import reducer, { changePhotos } from '../../Reducers';
import PhotoEntry from './photoEntry.jsx';
import PhotoUpload from './photoUpload.jsX';
import { connect } from 'react-redux';
import { bindActionCreaters } from 'redux';
import $ from 'jquery';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';

// const updatePhotos = (photos) => {
//   return {
//     type: 'CHANGE_PHOTOS',
//     payload: photos
//   };
// };

const mapStateToProps = ({ trip, user, photos }) => {
  return { trip, user, photos };
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreaters({ changePhotos: changePhotos }, dispatch);
// };

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
    $.ajax({
      url: HOSTNAME + `/photos?tripId=${this.props.trip.id}`,
      // data: options,
      method: 'GET',
      success: (photos) => {
        // console.log('received photos', photos);
        this.setState({photos: photos});
        // this.props.dispatch(reducer.changePhotos(photos));
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
