import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';

let mapStateToProps = ({user, trip}) => {
  return {user, trip};
};

class TripPopup1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      lodging: '',
      startDate: '',
      endDate: '' 
    };

    this.handleClick = this.handleClick.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);
  }

  createTripDashboard(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleClick(e) {
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      lodging: e.target.lodging.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      userId: this.props.user.id,
      accessCode: e.target.name.value,
      isopen: true
    };

    e.preventDefault();
    // let context = this;
    $.ajax({
      url: HOSTNAME + '/popup',
      method: 'POST',
      data: option,
      success: (trip) => {
        this.props.fetchLists();
        this.createTripDashboard(trip);
        console.log('POST for adding TRIP was a success', trip);
      },
      error: (err) => {
        console.log('error with POST when adding trip', err);
      }
    });
  }

  // resetValues() {
  //   this.state.name = '';
  //   this.state.location = '';
  //   this.state.loding = '';
  //   this.state.startDate = '';
  //   this.state.endDate = '';
  // }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-trip"><i className="fa fa-plus fa-fw" aria-hidden="true"></i>  Add To Queue</button>
        <div id="add-trip" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h2 className="modal-title">Trip Info</h2>
              </div>
              <div className="modal-body">
                <label>Trip Name: <input type="text" placeholder="name.." name="name" value={this.state.name} /></label>
                <label>Location: <input type="text" placeholder="location.." name="location" value={this.state.location}/></label>
                <label>Loding: <input type="text" placeholder="loding.." value={this.state.lodging} name="lodging"/></label>
                <label>Start Date: <input type="date" placeholder="start date.." name="startDate" value={this.state.size}/></label>
                <label>End Date: <input type="date" placeholder="end date.." name="endDate" value={this.state.size}/></label>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>Add</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TripPopup1);

// onChange={this.getName.bind(this)}
//  onChange={this.getLocation.bind(this)}
 // onChange={this.getLodging.bind(this)}
  // onChange={this.getStartDate.bind(this)}
  // onChange={this.getEndDate.bind(this)}

