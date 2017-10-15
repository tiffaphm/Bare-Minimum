import React from 'react';
import ChatEntry from './chatEntry.jsx';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateNotifications } from '../../Reducers';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

const mapStateToProps = ({ user, trip, notifications }) => {
  return { trip, user, notifications };
};

//anything returns from this function will end up as props
// const mapDispatchToProps = (dispatch) => {
//   //whenever updatedNotifications is called, result flows to all reducers
//   return bindActionCreators({updateNotifications: updateNotifications}, dispatch);
// };

class ChatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      message: ''
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.getChatMessages = this.getChatMessages.bind(this);
  }

  updateInput(e) {
    this.setState({message: e.target.value});
  }

  resetValue() {
    this.state.message = '';
  }

  handleMessage() {
    let chatEntry = {
      message: this.state.message,
      userId: this.props.user.id,
      tripId: this.props.trip.id,
      username: this.props.user.name
    };
    this.props.socket.emit('chat message', chatEntry);
    this.resetValue();
    this.getChatMessages();
  }

  componentDidMount() {
    this.getChatMessages(); 
  }

  getChatMessages() {
    this.props.socket.emit('get chats', this.props.trip.id);
    this.props.socket.on('chats for trip', (chats) => {
      this.setState({chats: chats});
    });
  }
 
  render() {
    const timeString = moment().calendar().toLowerCase();    
    return (
      <div className="card mb-3 chat-panel">
        <div className="card-header">
          <i className="fa fa-commets"></i> Trip Talk</div>
        <div className="list-group list-group-flush small">
        <div></div>
          {this.state.chats.map((chat, i) => <ChatEntry chat={chat} key={i} />)}
          <div className="chat-entry">
            <input type="text" className="chat-input" value={this.state.message} onChange={this.updateInput}/>
            <button onClick={this.handleMessage}>Send</button>
          </div>
        </div>
        <div className="card-footer small text-muted">updated {timeString}</div>
      </div>
    ); 
  }
}

export default connect(mapStateToProps)(ChatPanel);

