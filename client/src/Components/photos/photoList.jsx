import React from 'react';
import reducer from '../../Reducers';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import $ from 'jquery';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
// import dummyData from '../tripDashboard/dummyData.js';

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };

    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount () {
    this.getPhotos();
    // this.getUsers();
  }

  getPhotos () {
    const options = { tripId: this.props.trip.id };
    $.ajax({
      url: SERVER_URL + '/expense',
      data: options,
      method: 'GET',
      success: function(photos) {
        this.setState({ photos: photoss });
      }
    });
  }

  // findUser (userId) {
  //   for (var user of this.state.usersOnTrip) {
  //     if (user.id === userId) {
  //       return user.name;
  //     }
  //   }
  // }

  render() {
    return(
      <Row>
        <Col md={8} mdOffset={2}>
          <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
          <h3>Expenses Tracker</h3>
          <div>
            <ExpenseInput usersOnTrip={this.state.usersOnTrip} fetchExpenses={this.fetchExpenses.bind(this)} />
            <hr />
            <div>
              <h3>Current Expenses</h3>
              {this.state.expenses.map((item) => {
                return <ExpenseEntry expense={item} key={item.id} payer={this.findUser(item.userId)}/>
              })}
              <h3>Total Cost</h3>
              <div className="ExpenseEntry">${this.state.totalExpense}</div>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(PhotoList);
