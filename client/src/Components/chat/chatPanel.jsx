import React from 'react';
import ChatEntry from './chatEntry.jsx';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateNotifications } from '../../Reducers';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
// import ChatRoom from './chatRoom.jsx';

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
      message: '',
      rooms: [],
      active: false
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.getChatMessages = this.getChatMessages.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
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
      this.getRooms(chats);
    });
  }

  handleRoomChange(room) {
    console.log('here with room change', room);
  }

  getRooms(chats) {
    let users = chats.map(chat => chat.username);
    let rooms = new Set(users);
    if (rooms.size > 2) {
      rooms.add('Group');
      console.log('rooms', rooms);
      this.setState({rooms: Array.from(rooms)});
    } else {
      this.setState({rooms: ['Group']});
    }
  }
 
  render() {
    const timeString = moment().calendar().toLowerCase();    
    return (
      <div className="chat-panel-container">
        <div className="card mb-3 chat-panel">
          <div className="card-header">
            <i className="fa fa-fw fa-comment-o"></i> trip talk
          </div>
          <div className="list-group list-group-flush small add-scroll">
            {this.state.chats.map((chat, i) => <ChatEntry chat={chat} key={i} />)}
            <div className="form-group chat-entry">
              <input type="text" className="chat-input form-control" value={this.state.message} onChange={this.updateInput}/>
              <button className="btn" onClick={this.handleMessage}>Send</button>
            </div>
          </div>
          <div className="card-footer small text-muted">updated {timeString}</div>
        </div>
      </div>
    ); 
  }
}

export default connect(mapStateToProps)(ChatPanel);

