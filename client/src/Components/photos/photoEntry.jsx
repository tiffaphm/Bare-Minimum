import React from 'react';
import reducer from '../../Reducers';
import { connect } from 'react-redux';
// import TripNavBar from '../tripDashboard/tripNavBar.jsx';
// import dummyData from '../tripDashboard/dummyData.js';

const PhotoEntry = (props) => (
  <div className={props.size}>
    <div className="box">
      <a href="#" data-toggle="modal" data-target={`#${props.id}`}>
        <img src={props.photo.path || props.photo.preview}/>
      </a>
      <div className="modal fade" id={`${props.id}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <div className="modal-body">
              <img src={props.photo.path || props.photo.preview}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(PhotoEntry);
