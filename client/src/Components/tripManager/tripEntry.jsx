import React from 'react';

const TripEntry = (props) => {

  let startDate = Date.parse(props.trip.startDate);
  let startNewDate = new Date(startDate);
  let startYear = startNewDate.getFullYear();
  let startMonth = startNewDate.getMonth() + 1;
  let startDay = startNewDate.getDate();
  let startDateFormat = startMonth + '/' + startDay + '/' + startYear;

  let endDate = Date.parse(props.trip.endDate);
  let endNewDate = new Date(endDate);
  let endYear = endNewDate.getFullYear();
  let endMonth = endNewDate.getMonth() + 1;
  let endDay = endNewDate.getDate();
  let endDateFormat = endMonth + '/' + endDay + '/' + endYear;
  
  return (
      <div className="card mb-3 custom-card" onClick={props.click}>
        <a href="#">
          <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=610" alt="" />
        </a>
        <div className="card-body">
          <h6 className="card-title mb-1"><a href="#">{props.trip.name}</a></h6>
          <p className="card-text small">
            <a href="#">#surfsup</a>
          </p>
        </div>
        <hr className="my-0" />
        <div className="card-footer small text-muted">Posted 32 mins ago</div>
      </div>
  );
};

export default TripEntry;







// <tr> 
//     <td onClick={props.onClick}><a href='#'>{props.trip.name}</a></td>
//     <td>{props.trip.location}</td>
//     <td>{startDateFormat}</td>
//     <td>{endDateFormat}</td>
//     <td>{props.trip.accessCode}</td>
//   </tr>