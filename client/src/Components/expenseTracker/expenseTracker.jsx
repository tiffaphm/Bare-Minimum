import React from 'react';
import reducer from '../../Reducers';

import ExpenseEntry from './expenseEntry.jsx';
import ExpenseInput from './expenseInput.jsx';
import { connect } from 'react-redux';
import $ from 'jquery';
import TripNavBar from '../tripDashboard/tripNavBar.jsx';
import dummyData from '../tripDashboard/dummyData.js';

const SERVER_URL = HOSTNAME;

class ExpenseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseCost: 0,
      expenseDesc: '',
      userPaid: props.user.id,
      expenses: [],
      totalExpense: 0,
      usersOnTrip: []
    };
  }

  handleBack () {
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  getUsers() {
    let options = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: (data) => {
        this.setState({
          usersOnTrip: data
        });
      },
      error: (data) => {
        console.error('FAILED GET - Userlist', data);
      }
    };
    $.ajax(options);
  }

  componentDidMount () {
    this.fetchExpenses();
    this.getUsers();
  }

  fetchExpenses () {
    let options = { tripId: this.props.trip.id };
    let self = this;
    $.ajax({
      url: SERVER_URL + '/expense',
      data: options,
      method: 'GET',
      success: function(res) {
        self.setState({ expenses: res });
        self.setState({ totalExpense: res.reduce((acc, currExp) => {
          return acc + currExp.amount;
        }, 0).toFixed(2) });
      }
    });
  }

  findUser (userId) {
    for (var user of this.state.usersOnTrip) {
      if (user.id === userId) {
        return user.name;
      }
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          <TripNavBar features={dummyData.features} dispatch={this.props.dispatch}/>
          <h3>Expenses Tracker</h3>
          <div>
            <ExpenseInput usersOnTrip={this.state.usersOnTrip} fetchExpenses={this.fetchExpenses.bind(this)} />
            <hr />
            <div>
              <h4>All Expenses</h4>
                <section>
                  <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th>Shared By</th>
                          <th>Paid By</th>
                        </tr>
                      </thead>
                    </table>
                    <ExpenseEntry />
                </div>
                </section>
              <h3>Total Cost</h3>
              <div className="ExpenseEntry">${this.state.totalExpense}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(ExpenseTracker);


// {this.state.expenses.map((item) => {
//                 return <ExpenseEntry expense={item} key={item.id} payer={this.findUser(item.userId)}/>;
//               })}
