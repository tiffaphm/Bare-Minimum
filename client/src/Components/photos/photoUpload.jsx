import React from 'react';
import reducer from '../../Reducers';
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
      images: [],
      uploadedFileCloudinaryUrls: []
    };
    this.onImageDrop = this.onImageDrop.bind(this);
    this.addImagesToDatabase = this.addImagesToDatabase.bind(this);
    this.addAllImagesToCloud = this.addAllImagesToCloud.bind(this);
    this.addOneImageToCloud = this.addOneImageToCloud.bind(this);
    this.trip = this.props.trip.id;
    this.user = this.props.user.id;
  }

  onImageDrop(files) {
    this.setState({images: files});
    this.addAllImagesToCloud(files);
  }

  addImagesToDatabase(images) {
    $.ajax({
      url: HOSTNAME + '/photos',
      data: {images: images},
      method: 'POST',
      success: (images) => {
        // console.log('added photos to database', images);
        this.setState({images: images});
      },
      error: (err) => {
        console.log('error while adding photos to database', err);
      } 
    });
  }

  addAllImagesToCloud(images) {
    let counter = 0;
    images.forEach(img => {
      console.log('image', img);
      this.addOneImageToCloud(img)
        .then(url => {
          this.state.uploadedFileCloudinaryUrls.push({name: img.name, tripId: this.trip, path: url, userId: this.user});
          counter ++;
          if (counter === images.length) {
            this.addImagesToDatabase(this.state.uploadedFileCloudinaryUrls);
            this.setState({images: this.state.uploadedFileCloudinaryUrls});
          }
        })
        .catch(err => console.log('error adding multiple images to cloudinary', err));
    });
  }

  addOneImageToCloud(img) {
    return new Promise((resolve, reject) => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', img);

      upload.end((err, response) => {
        if (err) {
          reject(err);
        } else if (response.body.secure_url !== '') {
          // console.log('success from cloudinary', response.body.secure_url);
          resolve(response.body.secure_url);
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
          {this.state.images.map((photo, i) => <img src={photo.preview} key={i}/>)}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PhotoUpload);
