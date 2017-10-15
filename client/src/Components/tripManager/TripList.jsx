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
      {Array.isArray(props.trips) ? props.trips.map((trip) => {
        return <TripEntry trip={trip} key={trip.id} click={props.click}/>;
      }) : null}
    </div>
  </div>
);

export default TripList;

//trips
//click
 // <i className="fa fa-newspaper-o"></i> travel plans
// <div className="card-columns">
//   <div className="card mb-3">
//     <a href="#">
//       <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=610" alt="" />
//     </a>
//     <div className="card-body">
//       <h6 className="card-title mb-1"><a href="#">David Miller</a></h6>
//       <p className="card-text small">These waves are looking pretty good today!
//         <a href="#">#surfsup</a>
//       </p>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body py-2 small">
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-thumbs-up"></i>Like</a>
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-comment"></i>Comment</a>
//       <a className="d-inline-block" href="#">
//         <i className="fa fa-fw fa-share"></i>Share</a>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body small bg-faded">
//       <div className="media">
//         <img className="d-flex mr-3" src="http://placehold.it/45x45" alt="" />
//         <div className="media-body">
//           <h6 className="mt-0 mb-1"><a href="#">John Smith</a></h6>Very nice! I wish I was there! That looks amazing!
//           <ul className="list-inline mb-0">
//             <li className="list-inline-item">
//               <a href="#">Like</a>
//             </li>
//             <li className="list-inline-item">·</li>
//             <li className="list-inline-item">
//               <a href="#">Reply</a>
//             </li>
//           </ul>
//           <div className="media mt-3">
//             <a className="d-flex pr-3" href="#">
//               <img src="http://placehold.it/45x45" alt="" />
//             </a>
//             <div className="media-body">
//               <h6 className="mt-0 mb-1"><a href="#">David Miller</a></h6>Next time for sure!
//               <ul className="list-inline mb-0">
//                 <li className="list-inline-item">
//                   <a href="#">Like</a>
//                 </li>
//                 <li className="list-inline-item">·</li>
//                 <li className="list-inline-item">
//                   <a href="#">Reply</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="card-footer small text-muted">Posted 32 mins ago</div>
//   </div>

//   <div className="card mb-3">
//     <a href="#">
//       <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=180" alt="" />
//     </a>
//     <div className="card-body">
//       <h6 className="card-title mb-1"><a href="#">John Smith</a></h6>
//       <p className="card-text small">Another day at the office...
//         <a href="#">#workinghardorhardlyworking</a>
//       </p>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body py-2 small">
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-thumbs-up"></i>Like</a>
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-comment"></i>Comment</a>
//       <a className="d-inline-block" href="#">
//         <i className="fa fa-fw fa-share"></i>Share</a>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body small bg-faded">
//       <div className="media">
//         <img className="d-flex mr-3" src="http://placehold.it/45x45" alt="" />
//         <div className="media-body">
//           <h6 className="mt-0 mb-1"><a href="#">Jessy Lucas</a></h6>Where did you get that camera?! I want one!
//           <ul className="list-inline mb-0">
//             <li className="list-inline-item">
//               <a href="#">Like</a>
//             </li>
//             <li className="list-inline-item">·</li>
//             <li className="list-inline-item">
//               <a href="#">Reply</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//     <div className="card-footer small text-muted">Posted 46 mins ago</div>
//   </div>

//   <div className="card mb-3">
//     <a href="#">
//       <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=281" alt="" />
//     </a>
//     <div className="card-body">
//       <h6 className="card-title mb-1"><a href="#">Jeffery Wellings</a></h6>
//       <p className="card-text small">Nice shot from the skate park!
//         <a href="#">#kickflip</a>
//         <a href="#">#holdmybeer</a>
//         <a href="#">#igotthis</a>
//       </p>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body py-2 small">
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-thumbs-up"></i>Like</a>
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-comment"></i>Comment</a>
//       <a className="d-inline-block" href="#">
//         <i className="fa fa-fw fa-share"></i>Share</a>
//     </div>
//     <div className="card-footer small text-muted">Posted 1 hr ago</div>
//   </div>

//   <div className="card mb-3">
//     <a href="#">
//       <img className="card-img-top img-fluid w-100" src="https://unsplash.it/700/450?image=185" alt="" />
//     </a>
//     <div className="card-body">
//       <h6 className="card-title mb-1"><a href="#">David Miller</a></h6>
//       <p className="card-text small">It's hot, and I might be lost...
//         <a href="#">#desert</a>
//         <a href="#">#water</a>
//         <a href="#">#anyonehavesomewater</a>
//         <a href="#">#noreally</a>
//         <a href="#">#thirsty</a>
//         <a href="#">#dehydration</a>
//       </p>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body py-2 small">
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-thumbs-up"></i>Like</a>
//       <a className="mr-3 d-inline-block" href="#">
//         <i className="fa fa-fw fa-comment"></i>Comment</a>
//       <a className="d-inline-block" href="#">
//         <i className="fa fa-fw fa-share"></i>Share</a>
//     </div>
//     <hr className="my-0" />
//     <div className="card-body small bg-faded">
//       <div className="media">
//         <img className="d-flex mr-3" src="http://placehold.it/45x45" alt="" />
//         <div className="media-body">
//           <h6 className="mt-0 mb-1"><a href="#">John Smith</a></h6>The oasis is a mile that way, or is that just a mirage?
//           <ul className="list-inline mb-0">
//             <li className="list-inline-item">
//               <a href="#">Like</a>
//             </li>
//             <li className="list-inline-item">·</li>
//             <li className="list-inline-item">
//               <a href="#">Reply</a>
//             </li>
//           </ul>
//           <div className="media mt-3">
//             <a className="d-flex pr-3" href="#">
//               <img src="http://placehold.it/45x45" alt="" />
//             </a>
//             <div className="media-body">
//               <h6 className="mt-0 mb-1"><a href="#">David Miller</a></h6>
//               <img className="img-fluid w-100 mb-1" src="https://unsplash.it/700/450?image=789" alt="" />I'm saved, I found a cactus. How do I open this thing?
//               <ul className="list-inline mb-0">
//                 <li className="list-inline-item">
//                   <a href="#">Like</a>
//                 </li>
//                 <li className="list-inline-item">·</li>
//                 <li className="list-inline-item">
//                   <a href="#">Reply</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="card-footer small text-muted">Posted yesterday</div>
//   </div>
// </div>