import React from 'react';

const TripUserList = (props) => {
  return (
    <div>
      <h4>Member</h4>
      {Array.isArray(props.users) ? props.users.map((user, index) => {
        return (
          <div className="user-entry tripdata" key={index}>
            <hr/>
            <h3>{user.name}</h3>
            <p>Phone: {user.phone}</p>
            <p>Flight: {user.flightItinerary}</p>
          </div>
        );
      }) : null}
    </div>
  );
};

export default TripUserList;
