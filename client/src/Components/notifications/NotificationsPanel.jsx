import React from 'react';
import NotificationsPanelEntry from './NotificationsPanelEntry.jsx';
import { connect } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import { updateNotifications } from '../../Reducers';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

const socket = io();

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    user: state.user
  };
};

//anything returns from this function will end up as props
const mapDispatchToProps = (dispatch) => {
  //whenever updatedNotifications is called, result flows to all reducers
  return bindActionCreators({updateNotifications: updateNotifications}, dispatch);
};

class NotificationsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: true
    };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange() {
    this.setState({
      filtered: false
    });
    socket.emit('BULBASAUR', 'test');
  }

  render() {
    const timeString = moment().calendar().toLowerCase();    
    return (
      <div className="card mb-3">
        <div className="card-header">
          <i className="fa fa-bell-o"></i>travel updates</div>
        <div className="list-group list-group-flush small">
          {
            this.state.filtered ?
              this.props.notifications.slice(0, 3).map(notification => 
                <NotificationsPanelEntry key={notification.id} notification={notification}/>
              )
              :
              this.props.notifications.map(notification => 
                <NotificationsPanelEntry key={notification.id} notification={notification}/>
              )
          }
          <a className="list-group-item list-group-item-action" onClick={this.onFilterChange}>View all activity...</a>
        </div>
        <div className="card-footer small text-muted">updated {timeString}</div>
      </div>
    ); 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPanel);