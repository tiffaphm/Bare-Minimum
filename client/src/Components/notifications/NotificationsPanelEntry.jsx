import React from 'react';
import moment from 'moment';
const NotificationsPanelEntry = (props) => {
  var eventText;

  if (props.notification.event === 'add photo') {
    eventText = 'added a new photo!';
  } else if (props.notification.event === 'add message') {
    eventText = 'sent you a new message!';
  }

  var timeText = moment(props.notification.createdAt).calendar();
  var relativeTimeText = moment(props.notification.createdAt).fromNow();
  
  return (
    <a className="list-group-item list-group-item-action" href="#">
      <div className="media">
        <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
        <div className="media-body">
          <strong>{props.notification.name}</strong> {eventText}
          <div className="text-muted smaller">{timeText} - {relativeTimeText}</div>
        </div>
      </div>
    </a>
  );
};

export default NotificationsPanelEntry;