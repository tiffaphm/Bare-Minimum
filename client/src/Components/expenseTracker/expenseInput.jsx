import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

const SERVER_URL = HOSTNAME;

class ExpenseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseCost: 0,
      expenseDesc: '',
      userPaid: props.user.id
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges (field, e) {
    if (field === 'expenseCost') {
      this.setState({expenseCost: e.target.value});
    } else {
      this.setState({expenseDesc: e.target.value});
    }
  }

  submit () {
    let options = {
      amount: this.state.expenseCost,
      description: this.state.expenseDesc,
      userId: this.state.userPaid,
      tripId: this.props.trip.id
    };
    let self = this;
    $.ajax({
      url: SERVER_URL + '/expense',
      method: 'POST',
      data: options,
      success: function(res) {
        self.props.fetchExpenses();
      }
    });
    this.refs.amount.value = '';
    this.refs.desc.value = '';
  }

  changeSelectedUser (e) {
    this.setState({userPaid: e.target.value});
  }

  render () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="amount" className="col-2 col-form-label">Amount:</label>
          <div className="col-4">
            <input className="form-control" type="number" ref="amount" name="amount" id="amount "min="0" onChange={(e) => this.handleChanges('expenseCost', e)} step=".01" placeholder="0.00"/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-2 col-form-label">Description:</label>
          <div className="col-4">
            <input className="form-control" id="description" type="text" ref="desc" name="description" onChange={(e) => this.handleChanges('expenseDesc', e)}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="payer" className="col-2 col-form-label">Payer:</label>
          <div className="col-4">
            <select className="form-control" id="payer "value={this.state.userPaid} onChange={this.changeSelectedUser.bind(this)}>
              {this.props.usersOnTrip.map((user) => {
                return <option value={user.id} key={user.id}>{user.name}</option>;
              })}
            </select>
          </div>
        </div>
        <button className="btn" onClick={this.submit.bind(this)} type="submit" >Add Expense</button>
      </div>
    );
  }
}

let mapStateToProps = ({ trip, user }) => {
  return { trip, user };
};

export default connect(mapStateToProps)(ExpenseInput);