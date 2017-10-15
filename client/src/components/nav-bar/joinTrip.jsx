import React from 'react';
import { connect } from 'react-redux';
import reducer from '../../Reducers';

let mapStateToProps = ({user, trip}) => {
  return {user, trip};
};

class JoinTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.getCode = this.getCode.bind(this);
  }

  getCode(e) {
    this.setState({code: e.target.value});
  }

  handleClick() {
    let option = {
      accessCode: this.state.code,
      userId: this.props.user.id
    };
    this.props.joinTrip(option);
  }

  resetValues() {
    this.state.code = '';
  }

  render() {
    return (
      <div id="join-trip" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h2 className="modal-title">Trip Info</h2>
            </div>
            <div className="modal-body">
              <label>Trip Code: <input type="text" placeholder="access code.." name="accessCode" value={this.state.code} onChange={this.getCode} /></label>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>Add</button>
                <button type="button" className="btn btn-default" onClick={this.resetValues} data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(JoinTrip);
