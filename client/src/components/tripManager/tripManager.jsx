import React from 'react';
import Popup from 'react-popup';
import TripPopup from './tripPopup.jsx';
import TripEntry from './tripEntry.jsx';
import TripList from './TripList.jsx';
import NotificationsModal from '../notifications/NotificationsModal.jsx';
import reducer from '../../Reducers';

import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

let mapStateToProps = (state) => {
  return { user: state.user };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      trips: [],
      joinTrip: ''
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.joinTrip = this.joinTrip.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
  }

  componentDidMount() {
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  selectTrip(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleChange(e) {
    this.setState({joinTrip: e.target.value});
  }

  joinTrip() {
    let obj = {
      accessCode: this.state.joinTrip,
      userId: this.props.user.id
    };
    let context = this;
    $.ajax({
      url: SERVER_URL + '/jointrip',
      method: 'POST',
      data: obj,
      success: function(body) {
        context.props.fetchLists();
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-8">
          <h3>Welcome back, {this.props.user.name}</h3>
          </div>
          <div className="row trip-history manager-main custom-trip-history">
            <div className="col-md-8">
              <h5>All Trips</h5>
              <TripList trips={this.props.trips} click={this.selectTrip} />
            </div>
            <div className="col-lg-4">
              <NotificationsModal />
            </div>
          </div>
        </div>
        
        <div className="row create manager-main">
          <div className="col-md-6">
            <button className="btn" id="createtripbutton" onClick={this.togglePopup}>Create New Trip</button>
          </div>
        </div>

        <div className="row join manager-main">
          <div className="col-md-4">
            <h3 className="welcome">Join Trip</h3>
            <div>
              <input value={this.state.joinTrip} onChange={e => this.handleChange(e)} type="text" name="code" placeholder="add code here"/>
              <button className="btn" onClick={this.joinTrip}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);

  //after line 101
   // {this.state.showPopup ?
   //        <TripPopup
   //          closePopup={this.togglePopup}
   //          fetchLists={this.props.fetchLists}
   //          selectTrip={this.selectTrip}
   //        />
   //        : null
   //      }

// <table className="table historytable table-bordered">
//               <thead className="thead-inverse">
//                 <tr>
//                   <th>Trip Name</th>
//                   <th>Trip Location</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Access Code</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(this.props.trips) ? this.props.trips.map((ele) => {
//                   return <TripEntry trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>;
//                 }) : null}
//               </tbody>
//             </table>
