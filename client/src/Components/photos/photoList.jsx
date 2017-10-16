import React from 'react';
import reducer, { changePhotos } from '../../Reducers';
import PhotoEntry from './PhotoEntry.jsx';
import PhotoUpload from './photoUpload.jsx';
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
      photos: [],
      photoSize: 0
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.photoSize = this.photoSize.bind(this);
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
        this.setState({photos: photos.reverse()});
        // this.props.dispatch(reducer.changePhotos(photos));
      },
      error: (err) => {
        console.log('error while getting photos (client)', err);
      } 
    });
  }

  photoSize() {
    if (this.state.photoSize === 0) {
      this.state.photoSize++;
      return 'col-md-8 col-sm-12 col-xs-12 gal-item';
    } else if (this.state.photoSize === 8) {
      this.state.photoSize = 0;
      return 'col-md-4 col-sm-6 co-xs-12 gal-item';
    } else {
      this.state.photoSize++;
      return 'col-md-4 col-sm-6 co-xs-12 gal-item';
    }
  }

  render() {
    return (
      <div>
        <div>
          <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
          <PhotoUpload addSize={this.photoSize} updatePhotos={this.getPhotos}/>
          <div className="row">
            {this.state.photos.map((photo, i) => <PhotoEntry photo={photo} id={i} key={i} size={this.photoSize()}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PhotoList);
