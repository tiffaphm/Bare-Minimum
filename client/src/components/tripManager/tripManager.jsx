import React from 'react';
import Popup from 'react-popup';
import TripEntry from './tripEntry.jsx';
import TripList from './TripList.jsx';
import NotificationsPanel from '../notifications/NotificationsPanel.jsx';
import reducer from '../../Reducers';

import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

let mapStateToProps = (state) => {
  return { user: state.user };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      joinTrip: ''
    };

    this.selectTrip = this.selectTrip.bind(this);
  }

  componentDidMount() {
  }

  selectTrip(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  render() {
    return (
      <div className="trip-manager-container">
        <div className="row">
          <div className="col-md-8">
            <div className="welcome-message">
            <h3>Welcome back, {this.props.user.name}</h3>
            </div>
            <div className="trip-history manager-main custom-trip-history">
              <TripList trips={this.props.trips} click={this.selectTrip} />
            </div>
          </div>
          <div className="col-md-4 notifications-container">
            <NotificationsPanel socket={this.props.socket} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
