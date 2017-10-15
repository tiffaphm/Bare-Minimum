import React from 'react';
import moment from 'moment';

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
  // console.log('time format', moment(props.trip.createdAt).calender());
  return (
    <div className="card-container">
      <div className="card mb-3 custom-card" onClick={() => props.click(props.trip)}>
        <div className="photo-card">
          {props.trip.photo ? <a href="#"><img className="card-img-top img-fluid w-100" src={props.trip.photo.path} alt="" /></a>
            : <div className="card-img-top img-fluid w-100 add-photo-card">Please go to photos <br/>and add a trip photo</div>}
        </div>
        <div className="card-body">
          <h4 className="card-title mb-1 custom-card-name"><a href="#">{props.trip.name}</a></h4>
          <hr className="mt-2" />
          <div className="card-text small custom-dates">Travel Dates</div>
          <div className="card-text small custom-dates"> {startDateFormat} - {endDateFormat}</div>
        </div>
      </div>
    </div>
  );
};

export default TripEntry;

//testing trip card photo class from upload component
// col-md-4 col-sm-6 co-xs-12 gal-item


//original trip card photo class
// card-img-top img-fluid w-100

//footer for trip card with timestamp of when it was posted
//  <hr className="my-0" />
        // <div className="card-footer small text-muted custom-dates">Posted sometime ago</div>