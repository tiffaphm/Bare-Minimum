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

    this.findUser = this.findUser.bind(this);
  }

  handleBack () {
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  getUsers() {
    let request = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: (data) => {
        this.setState({
          usersOnTrip: data,
        });
      },
      error: (data) => {
        console.error('FAILED GET - Userlist', data);
      }
    };
    $.ajax(request);
  }

  componentDidMount () {
    this.fetchExpenses();
    this.getUsers();
  }

  fetchExpenses () {
    let options = { tripId: this.props.trip.id };
    $.ajax({
      url: SERVER_URL + '/expense',
      data: options,
      method: 'GET',
      success: (expenses) => {
        console.log('received expenses', expenses);
        this.setState({ expenses: expenses });
        this.setState({ totalExpense: expenses.reduce((total, expense) => {
          return total + expense.amount;
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
          <h3 className="expenses">Expenses Tracker</h3>
          <div>
            <ExpenseInput usersOnTrip={this.state.usersOnTrip} fetchExpenses={this.fetchExpenses.bind(this)} />
            <hr />
            <div>
              <h4 className="expenses">Total Expenses</h4>
              <h3 className="ExpenseEntry expenses"><b>${this.state.totalExpense}</b></h3>
              <br/>
              <h4 className="expenses ">All Expenses</h4>
              <div className="tbl-header">
                <table className="table">
                  <thead className="thead-default">
                    <tr>
                      <th>#</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Paid By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.expenses.map((expense, i) => <ExpenseEntry expense={expense} row={i+1} key={i} payer={this.findUser(expense.userId)}/>)}
                  </tbody>
                </table>
              </div>
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
