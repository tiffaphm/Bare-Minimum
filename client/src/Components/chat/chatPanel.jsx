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

    this.getChatMessage = this.getChatMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

  }

  getChatMessage(e) {
    console.log('event', e.target.value);
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

    console.log('chat entry', chatEntry);
    this.props.socket.emit('chat message', chatEntry);

  }

  componentWillMount() {
    this.props.socket.on('chat message', chats => {
      console.log('received all chats from database', chats);
      this.setState({chats: chats.filter(chat => chat.tripId === this.props.trip.id)});
    });
  }
  // this.onFilterChange = this.onFilterChange.bind(this);
  // props.socket.on('connection', function() {
  //   console.log('this is a successful connection to server');
  // });

  // props.socket.on('testmessage', function() {
  //   console.log('this is a successful push from server');
  // });

  // onFilterChange() {
  //   this.setState({
  //     filtered: false
  //   });
  //   socket.emit('BULBASAUR', 'test');
  // }

  render() {
    const timeString = moment().calendar().toLowerCase();    
    return (
      <div className="card mb-3 chat-panel">
        <div className="card-header">
          <i className="fa fa-bell-o"></i>Trip Talk</div>
        <div className="list-group list-group-flush small">
          {
            this.state.filtered ?
              this.props.notifications.slice(0, 3).map(notification => 
                <ChatEntry key={notification.id} notification={notification}/>
              )
              :
              this.props.notifications.map(notification => 
                <ChatEntry key={notification.id} notification={notification}/>
              )
          }
          <div className="chat-entry">
            <input type="text" className="chat-input" value={this.state.message} onChange={this.getChatMessage}/>
            <button onClick={this.handleMessage}>Send</button>
          </div>
        </div>
        <div className="card-footer small text-muted">updated {timeString}</div>
      </div>
    ); 
  }
}

export default connect(mapStateToProps)(ChatPanel);

// <a className="list-group-item list-group-item-action" onClick={this.onFilterChange}>View all activity...</a>