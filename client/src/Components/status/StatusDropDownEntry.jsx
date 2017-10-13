import React from 'react';
import moment from 'moment';

const StatusDropDownEntry = (props) => {
  
  var timeStamp = moment(props.notification.createdAt).format('LT');
  var statusHeader;
  var statusHeaderClass = 'fa fa-fw';
  if (props.notification.event === 'add photo') {
    statusHeader = 'new photo';
    statusHeaderClass = `${statusHeaderClass} fa-camera`;
  } else if (props.notification.event === 'add message') {
    statusHeader = 'new message';
    statusHeaderClass = `${statusHeaderClass} fa-usd`;
  } 
  
  return (
    <div>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">
        <span className="text-success">
          <strong>
            <i className={statusHeaderClass}></i>{statusHeader}</strong>
        </span>
        <span className="small float-right text-muted">{timeStamp}</span>
        <div className="dropdown-message small">{props.notification.name} added a {statusHeader}.</div>
      </a>
    </div>
  );
};
export default StatusDropDownEntry;