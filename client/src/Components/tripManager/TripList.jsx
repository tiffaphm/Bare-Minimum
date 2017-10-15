import React from 'react';
import TripEntry from './tripEntry.jsx';

const TripList = (props) => (
  <div className="trip-list-container">
    <div className="mb-0 mt-4">
      <i className="glyphicon-star-empty"></i>
      <h5>Good times come and go, but the memories last forever...</h5>
    </div>
    <hr className="mt-2" />
    <div className="trip-cards-container">
      {Array.isArray(props.trips) ? props.trips.map((trip, index) => {
        return <TripEntry trip={trip} key={index} click={props.click}/>;
      }) : null}
    </div>
  </div>
);

export default TripList;
