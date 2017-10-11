import React from 'react';
import UserInfo from './userInfo.jsx';

const TripUserList = (props) => {
  return (
    <div>
      <hr/>
      <h4>Who is coming:</h4>
      {props.users.map((user, index) => {
        return (
          <div className="user-entry" key={index} className="tripdata" onClick={() => { props.showUserInfo(user.id); }}>
            <Button className="btn-large"><span className="glyphicon user" /> {user.name}</Button>
            {props.selectedUser.UserId === user.id ? <UserInfo user={props.selectedUser} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export default TripUserList;
