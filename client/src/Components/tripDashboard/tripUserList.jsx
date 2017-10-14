import React from 'react';
import UserInfo from './userInfo.jsx';

const TripUserList = (props) => {
  return (
    <div>
      <h4>Member</h4>
      <hr/>
      {Array.isArray(props.users) ? props.users.map((user, index) => {
        return (
          <div className="user-entry" key={index} className="tripdata" onClick={() => { props.showUserInfo(user.id); }}>
            <button className="btn-large"><span className="glyphicon user" /> {user.name}</button>
            {props.selectedUser.UserId === user.id ? <UserInfo user={props.selectedUser} /> : null}
          </div>
        );
      }) : null}
    </div>
  );
};

export default TripUserList;
