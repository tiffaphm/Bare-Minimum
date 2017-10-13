import React from 'react';
import StatusDropDownEntry from './StatusDropDownEntry.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  notifications: state.notifications
});

const StatusDropDown = (props) => (
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i className="fa fa-fw fa-bell"></i>
      <span className="d-lg-none">Alerts
        <span className="badge badge-pill badge-warning">6 New</span>
      </span>
      <span className="indicator text-warning d-none d-lg-block">
        <i className="fa fa-fw fa-circle"></i>
      </span>
    </a>
    <div className="dropdown-menu" aria-labelledby="alertsDropdown">
      <h6 className="dropdown-header">new travel updates:</h6>
      {
        props.notifications.map(notification => 
          <StatusDropDownEntry key={notification.id} notification={notification}/>
        )
      }
    </div>        
  </li>
);

export default connect(mapStateToProps)(StatusDropDown);