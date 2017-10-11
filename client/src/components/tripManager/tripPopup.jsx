import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';

const SERVER_URL = HOSTNAME;

class TripPopup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);
  }

  createTripDashboard(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleSubmit(e) {
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      lodging: e.target.lodging.value,
      startDate: e.target.start.value,
      endDate: e.target.end.value,
      userId: this.props.user.id,
      accessCode: e.target.name.value,
      isopen: true
    };

    e.preventDefault();
    let context = this;
    $.ajax({
      url: HOSTNAME + '/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        context.props.fetchLists();
        this.createTripDashboard(body);
        console.log('POST was a success ');
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    });
  }

  render() {
    return (
      <div className="row popup">
        <div className="col-md-4" className="popup_inner">
          <h3>Create a new trip:</h3>
          <form className="popupform" onSubmit={this.handleSubmit}>
            <div className="form-entry">
              <label>Trip Name:</label>
              <input className="popupfield" type="text" name="name" placeholder="add name..."/>
            </div>

            <div className="form-entry">
              <label>Trip Location:</label>
              <input className="popupfield" type="text" name="location" placeholder="add Location..."/>
            </div>

            <div className="form-entry">
              <label>Trip Lodging:</label>
              <input className="popupfield" type="text" name="lodging" placeholder="add Lodging..."/>
            </div>

            <div className="form-entry">
              <label>Start Date:</label>
              <input className="popupfield" type="date" name="start" placeholder="start date..."/>
            </div>

            <div className="form-entry">
              <label>End Date:</label>
              <input className="popupfield" type="date" name="end" placeholder="end date..."/>
            </div>

            <button className="popupbutton" type="submit" value="create trip">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(TripPopup);
