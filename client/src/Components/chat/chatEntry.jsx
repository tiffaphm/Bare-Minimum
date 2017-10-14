import React from 'react';
import moment from 'moment';
const ChatEntry = (props) => {
  var timeText = moment(props.chat.createdAt).calendar().match(/(\d.+)/)[0];
  var relativeTimeText = moment(props.chat.createdAt).fromNow();
  return (
    <a className="list-group-item list-group-item-action" href="#">
      <div className="media">
        <div className="media-body">
          <div className="chat-author">{props.chat.username}:
            <div className="chat-message">{props.chat.message}</div>
            <div className="text-muted smaller chat-time">{timeText}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ChatEntry;