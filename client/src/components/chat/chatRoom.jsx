import React from 'react';
import moment from 'moment';


class ChatRoom extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: '',
      default: 'Group'
    };
  }


  componentDidMount() {
  }


  render() {
    return (this.props.active === 'true' 
      ? <li className="active"><a href="#" className="nav nav-tabs" onClick={() => this.props.roomChange(room)}>{this.props.room.split(' ')[0]}</a></li>
      : <li><a href="#" className="nav nav-tabs" onClick={() => this.props.roomChange(room)}>{this.props.room.split(' ')[0]}</a></li>
    );
  }
}


export default ChatRoom;

// <div class="container">
//   <ul class="nav nav-tabs">
//     <li class="active"><a href="#">Home</a></li>
//     <li><a href="#">Menu 1</a></li>
//     <li><a href="#">Menu 2</a></li>
//     <li><a href="#">Menu 3</a></li>
//   </ul>
//   <br>
//   <p><strong>Note:</strong> This example shows how to create a basic navigation tab. It is not toggleable/dynamic yet (you can't click on the links to display different content)- see the last example in the Bootstrap Tabs and Pills Tutorial to find out how this can be done.</p>
// </div>