import React from 'react';
import reducer from '../../Reducers';
import ExpenseEntry from './expenseEntry.jsx';
import ExpenseInput from './expenseInput.jsx';
import { connect } from 'react-redux';
import $ from 'jquery';

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
        console.log('successful GET - Userlist', data);
        this.setState({
          usersOnTrip: data
        });
      },
      error: (data) => {
        console.log('FAILED GET - Userlist', data);
      }
    }
    $.ajax(options);
  }

  componentDidMount () {
    this.fetchExpenses();
    this.getUsers();
  }

  fetchExpenses () {
    console.log('Fetching expense list');
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
        }, 0).toFixed(2) })
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
		return(
			<div>
        <h1>Expenses Tracker</h1>
        <button onClick={this.handleBack.bind(this)}>Back</button><br />
        <div>Add an expense
      	  <ExpenseInput usersOnTrip={this.state.usersOnTrip} fetchExpenses={this.fetchExpenses.bind(this)} />
          <hr />
          <div>
            <h4>Current Expenses</h4>
            {this.state.expenses.map((item) => {
              return <ExpenseEntry expense={item} key={item.id} payer={this.findUser(item.userId)}/>
            })}
            <h4>Total Cost</h4> ${this.state.totalExpense}
          </div>
        </div>
        <div></div>
      </div>
		)
	}
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
}

export default connect(mapStateToProps)(ExpenseTracker);
