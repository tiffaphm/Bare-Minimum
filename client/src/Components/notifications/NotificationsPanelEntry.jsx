import React from 'react';
import moment from 'moment';
const NotificationsPanelEntry = (props) => {
  var eventText;
  if (props.notification.type === 'photo') {
    eventText = 'added a new photo!';
  } else if (props.notification.type === 'expense') {
    eventText = `${props.notification.name} added a $${props.notification.amount.toFixed(2)} expense.`;
  }

  var timeText = moment(props.notification.createdAt).calendar();
  var relativeTimeText = moment(props.notification.createdAt).fromNow();
  
  return (
    <a className="list-group-item list-group-item-action" href="#">
      <div className="media">
        <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
        <div className="media-body">
          <strong>{props.notification.tripsName} trip: {props.notification.description}</strong><br /> {eventText}
          <div className="text-muted smaller">{timeText} - {relativeTimeText}</div>
        </div>
      </div>
    </a>
  );
};

export default NotificationsPanelEntry;