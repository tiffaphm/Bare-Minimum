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
              <h2 className="modal-title">Trip Details</h2>
            </div>
            <div className="modal-body modal-style">
              <form role="form">
                <div className="form-group row">
                  <label htmlFor="name" className="col-3 col-form-label">Trip Name:  </label>
                  <div className="col-4">
                    <input className="form-control "type="text" placeholder="name.." id="name" name="name" value={this.state.name} onChange={this.getName.bind(this)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="location" className="col-3 col-form-label">Location:  </label>
                  <div className="col-4">
                    <input className="form-control "type="text" placeholder="location.." id="location" name="location" value={this.state.location} onChange={this.getLocation.bind(this)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lodging" className="col-3 col-form-label">Lodging:  </label>
                  <div className="col-4">
                    <input className="form-control "type="text" placeholder="lodging.." id="lodging" name="lodging" value={this.state.lodging} onChange={this.getLodging.bind(this)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="start-date" className="col-3 col-form-label">Start Date:  </label>
                  <div className="col-4">
                    <input className="form-control "type="date" id="start-date" name="start-date" value={this.state.startDate} onChange={this.getStartDate.bind(this)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="end-date" className="col-3 col-form-label">End Date:  </label>
                  <div className="col-4">
                    <input className="form-control "type="date" id="end-date" name="end-date" value={this.state.endDate} onChange={this.getEndDate.bind(this)} />
                  </div>
                </div> 
              </form> 
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
