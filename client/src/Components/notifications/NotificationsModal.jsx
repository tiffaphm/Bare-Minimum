import React from 'react';

const NotificationsModal = (props) => (
  <div className="card mb-3">
    <div className="card-header">
      <i className="fa fa-bell-o"></i> Feed Example</div>
    <div className="list-group list-group-flush small">
      <a className="list-group-item list-group-item-action" href="#">
        <div className="media">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <strong>David Miller</strong>posted a new article to
            <strong>David Miller Website</strong>.
            <div className="text-muted smaller">Today at 5:43 PM - 5m ago</div>
          </div>
        </div>
      </a>
      <a className="list-group-item list-group-item-action" href="#">
        <div className="media">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <strong>Samantha King</strong>sent you a new message!
            <div className="text-muted smaller">Today at 4:37 PM - 1hr ago</div>
          </div>
        </div>
      </a>
      <a className="list-group-item list-group-item-action" href="#">
        <div className="media">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <strong>Jeffery Wellings</strong>added a new photo to the album
            <strong>Beach</strong>.
            <div className="text-muted smaller">Today at 4:31 PM - 1hr ago</div>
          </div>
        </div>
      </a>
      <a className="list-group-item list-group-item-action" href="#">
        <div className="media">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <i className="fa fa-code-fork"></i>
            <strong>Monica Dennis</strong>forked the
            <strong>startbootstrap-sb-admin</strong>repository on
            <strong>GitHub</strong>.
            <div className="text-muted smaller">Today at 3:54 PM - 2hrs ago</div>
          </div>
        </div>
      </a>
      <a className="list-group-item list-group-item-action" href="#">View all activity...</a>
    </div>
    <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
  </div>
);

export default NotificationsModal;