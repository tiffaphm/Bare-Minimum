import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import Mapbox from '../mapboxViewer.jsx';
// import Landmarks from '../landmarks/landmarks.jsx';
import TripNavBar from './tripNavBar.jsx';
// import ProfileEditor from '../profileEditor/ProfileEditor.jsx'; // remove after testing
import reducer from '../../Reducers';
import dummyData from './dummyData.js';
import TripUserList from './tripUserList.jsx';
import ChatPanel from '../chat/chatPanel.jsx';
import TripDetails from './tripDetails.jsx';
import NotificationsPanel from '../notifications/NotificationsPanel.jsx';

let mapStateToProps = (state) => {
  return { trip: state.trip };
};

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
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

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="trip-dashboard-container">
        <div className="row">
          <div className="col-md-9">
            <TripNavBar
              features={dummyData.features}
              dispatch={this.props.dispatch}
            />
            <TripDetails trip={this.props.trip} />
            <TripUserList users={this.state.users}/>
            <ChatPanel socket={this.props.socket} />
          </div>
          <div className="col-md-3 notifications-container">
            <NotificationsPanel socket={this.props.socket} />
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(TripDashboard);