import React from 'react';
import { connect } from 'react-redux';
import reducer from '../../Reducers';

let mapStateToProps = ({user, trip}) => {
  return {user, trip};
};

class CreateTripModal extends React.Component {
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
    this.resetValues = this.resetValues.bind(this);
  }

  createTripDashboard(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripManager'));
  }

  getName(e) {
    this.setState({name: e.target.value});
  }

  getLocation(e) {
    this.setState({location: e.target.value});
  }

  getLodging(e) {
    this.setState({lodging: e.target.value});
  }

  getStartDate(e) {
    this.setState({startDate: e.target.value});
  }

  getEndDate(e) {
    this.setState({endDate: e.target.value});
  }

  handleClick(e) {
    let option = {
      name: this.state.name,
      location: this.state.location,
      lodging: this.state.lodging,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      userId: this.props.user.id,
      accessCode: this.state.name,
      isopen: true
    };
    this.props.createTrip(option, this.createTripDashboard);
  }

  resetValues() {
    this.state.name = '';
    this.state.location = '';
    this.state.loding = '';
    this.state.startDate = '';
    this.state.endDate = '';
  }

  render() {
    return (
      <div id="add-trip" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h2 className="modal-title">Trip Info</h2>
            </div>
            <div className="modal-body">
              <label>Trip Name: <input type="text" placeholder="name.." name="name" value={this.state.name} onChange={this.getName.bind(this)} /></label>
              <label>Location: <input type="text" placeholder="location.." name="location" value={this.state.location} onChange={this.getLocation.bind(this)}/></label>
              <label>Lodging: <input type="text" placeholder="loding.." value={this.state.lodging} name="lodging" onChange={this.getLodging.bind(this)}/></label>
              <label>Start Date: <input type="date" placeholder="start date.." name="startDate" value={this.state.startDate} onChange={this.getStartDate.bind(this)}/></label>
              <label>End Date: <input type="date" placeholder="end date.." name="endDate" value={this.state.endDate} onChange={this.getEndDate.bind(this)}/></label>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>Add</button>
              <button type="button" className="btn btn-default" onClick={this.resetValues} data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateTripModal);
