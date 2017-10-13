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
    <div className="card mb-3" onClick={props.click(props.trip)}>
      <a href="#">
        <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=610" alt="" />
      </a>
      <div className="card-body">
        <h6 className="card-title mb-1"><a href="#">props.trip.name</a></h6>
        <p className="card-text small">
          <a href="#">#surfsup</a>
        </p>
      </div>
      <hr className="my-0" />
      <div className="card-body py-2 small">
        <a className="mr-3 d-inline-block" href="#">
          <i className="fa fa-fw fa-thumbs-up"></i>Like</a>
        <a className="mr-3 d-inline-block" href="#">
          <i className="fa fa-fw fa-comment"></i>Comment</a>
        <a className="d-inline-block" href="#">
          <i className="fa fa-fw fa-share"></i>Share</a>
      </div>
      <hr className="my-0" />
      <div className="card-body small bg-faded">
        <div className="media">
          <img className="d-flex mr-3" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <h6 className="mt-0 mb-1"><a href="#">John Smith</a></h6>Very nice! I wish I was there! That looks amazing!
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#">Like</a>
              </li>
              <li className="list-inline-item">·</li>
              <li className="list-inline-item">
                <a href="#">Reply</a>
              </li>
            </ul>
            <div className="media mt-3">
              <a className="d-flex pr-3" href="#">
                <img src="http://placehold.it/45x45" alt="" />
              </a>
              <div className="media-body">
                <h6 className="mt-0 mb-1"><a href="#">David Miller</a></h6>Next time for sure!
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="#">Like</a>
                  </li>
                  <li className="list-inline-item">·</li>
                  <li className="list-inline-item">
                    <a href="#">Reply</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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