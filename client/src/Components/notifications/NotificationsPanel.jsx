import React from 'react';
import NotificationsPanelEntry from './NotificationsPanelEntry.jsx';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  };
};

const NotificationsPanel = (props) => {

  console.log(props.notifications);
  const timeString = moment().calendar().toLowerCase();

  return (
    <div className="card mb-3">
      <div className="card-header">
        <i className="fa fa-bell-o"></i>travel feed</div>
      <div className="list-group list-group-flush small">
        {
          props.notifications.map(notification => 
            <NotificationsPanelEntry key={notification.id} notification={notification}/>
          )
        }
        <a className="list-group-item list-group-item-action" href="#">View all activity...</a>
      </div>
      <div className="card-footer small text-muted">updated {timeString}</div>
    </div>
  ); 
};

export default connect(mapStateToProps)(NotificationsPanel);