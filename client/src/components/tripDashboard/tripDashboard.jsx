import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import Mapbox from '../mapboxViewer.jsx';
// import Landmarks from '../landmarks/landmarks.jsx';
import TripNavBar from './tripNavBar.jsx';
import UserInfo from './userInfo.jsx';
// import ProfileEditor from '../profileEditor/ProfileEditor.jsx'; // remove after testing
import reducer from '../../Reducers';
import dummyData from './dummyData.js';
import TripUserList from './tripUserList.jsx';
import TripDetails from './tripDetails.jsx';
import NotificationsPanel from '../notifications/NotificationsPanel.jsx';

let mapStateToProps = (state) => {
  return { trip: state.trip };
};

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: true,
      users: [],
      selectedUserInfo: ''
    };

    this.toggleMap = this.toggleMap.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
  }

  // retrieves array of users on trip
  getUsers() {
    let options = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: data => {
        this.setState({
          users: data
        });
      },
      error: data => {
        console.error('FAILED GET - Userlist', data);
      }
    };

    $.ajax(options);
  }

  toggleMap() {
    this.setState({
      map: !this.state.map
    });
  }

  // select user to display info
  // on click, set selectedUser to clicked
  showUserInfo(userId) {
    let options = {
      url: `${HOSTNAME}/userinfo/${userId}/${this.props.trip.id}`,
      success: data => {
        this.setState({
          selectedUserInfo: data
        });
      },
      error: data => {
        console.log('FAILED GET - User Info', data);
      }
    };

    $.ajax(options);
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <TripNavBar
            features={dummyData.features}
            dispatch={this.props.dispatch}
          />
          <div className="row">
            <div className="col-md-8">
              <TripDetails trip={this.props.trip} />
            </div>
            <div className="col-md-4">
              <TripUserList  
                users={this.state.users}
                selectedUser={this.state.selectedUserInfo}
                showUserInfo={this.showUserInfo}
              />
            </div>
          </div>
        </div>
        <div className="col-md-3 notifications-container">
          <NotificationsPanel socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TripDashboard);
