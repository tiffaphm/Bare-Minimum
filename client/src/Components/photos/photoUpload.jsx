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
import Dropzone from 'react-dropzone';
import request from 'superagent';
import $ from 'jquery';
const CLOUDINARY_UPLOAD_PRESET = 'lfnra5zh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djffzbz5m/upload';

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};


class PhotoUpload extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: [],
      uploadedFileCloudinaryUrls: []
    };
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files) {
    // console.log(files);
    const tripImages = files.map(img => {
      img.tripId = this.props.trip.id;
      img.userId = this.props.user.id;
      return img;
    });

    this.setState({photos: tripImages});
    this.handleImageUpload(tripImages);
  }

  handleImageUpload(files) {
    // $.ajax({
    //   url: HOSTNAME + '/photos',
    //   data: JSON.stringify(files),
    //   method: 'POST',
    //   success: (response) => {
    //     console.log('added photos to database', response);
    //     // this.setState({photos: photos });
    //   },
    //   error: (err) => {
    //     console.log('error while adding photos to databse', err);
    //   } 
    // });

    files.forEach(img => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', img);

      upload.end((err, response) => {
        if (err) {
          console.error('error adding to cloudinary', err);
        } else if (response.body.secure_url !== '') {
          // this.setState({
          //   uploadedFileCloudinaryUrl: response.body.secure_url
          // });
          console.log('success from cloudinary', response.body.secure_url);
        }
      });
    });

    
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={true}
          accept="image/*"
          onDrop={this.onImageDrop}>
          <p>Add image</p>
        </Dropzone>
        <div className="uploaded-images">
          {this.state.photos.map(photo => <img src={photo.preview} key={photo.name}/>)}
        </div>
      </div>
    );
  }
}

// let mapStateToProps = ({ trip, user }) => {
//   return { trip, user };
// };

export default connect(mapStateToProps)(PhotoUpload);
