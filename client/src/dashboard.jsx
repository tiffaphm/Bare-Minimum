import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import '../dist/vendor/bootstrap/css/bootstrap.css';
import '../dist/stylesheet.css';
import '../dist/sb-admin.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './Reducers';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
const store = createStoreWithMiddleware(reducer.travelReducer);
const { getState } = store;

import NavSideBar from './NavSideBar.jsx';
import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx';
import MapboxViewer from './components/mapboxViewer.jsx';
import ExpenseTracker from './components/expenseTracker/expenseTracker.jsx';
import PlacesOfInterest from './components/PlacesOfInterest/PlacesOfInterest.jsx';
import NotificationsPanel from './components/notifications/NotificationsPanel.jsx';
import PhotoList from './components/photos/photoList.jsx';
import CreateTrip from './Components/NavBarComponents/createTrip.jsx';
import JoinTrip from './Components/NavBarComponents/joinTrip.jsx';

const SERVER_URL = HOSTNAME;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    //Listen to changes in the redux store
    store.subscribe(() => {
      this.setState({ reload: false });
    });
    this.state = {
      trips: [],
      socket: io()
    };
    this.fetchLists = this.fetchLists.bind(this);
    this.state.socket.on('new notification', function(JSONObj) {
      var updatedNotifications = store.getState().notifications.slice();
      updatedNotifications.unshift(JSON.parse(JSONObj));
      console.log('this is the updated notifications', updatedNotifications);
      store.dispatch(reducer.updateNotifications(updatedNotifications));
      console.log('there is a new notification from the server', JSON.parse(JSONObj));
    });
  }

  componentWillMount() {
    //Get login user
    $.get(SERVER_URL + '/loginuser')
      .then(data => {
        store.dispatch(reducer.changeUser(data[0]));
        this.fetchLists();
      })
      .then(() => {
        this.state.socket.emit('report', { userId: store.getState().user.id.toString() });
        return $.get(SERVER_URL + `/notifications?userId=${store.getState().user.id}`);
      })
      .then((data) => {
        store.dispatch(reducer.updateNotifications(data[0].reverse()));
      })
      .catch(err => {
        console.error('Error getting login user', err);
      });
  }

  handleLogout() {
    $.post(SERVER_URL + '/logout')
      .then(reply => {
        location.reload();
      })
      .catch(err => {
        console.error('Error!', err);
      });
  }

  fetchLists() {
    $.ajax({
      url: SERVER_URL + '/fetchtrips',
      data: { userId: store.getState().user.id },
      success: (res) => {
        this.setState({ trips: res });
      }
    });
  }

  getViewComponent () {
    if (store.getState().view === 'TripManager') {
      return <TripManager socket={this.state.socket} trips={this.state.trips} fetchLists={this.fetchLists}/>;
    } else if (store.getState().view === 'ExpenseTracker') {
      return <ExpenseTracker />;
    } else if (store.getState().view === 'PlacesOfInterest') {
      return <PlacesOfInterest />;
    } else if (store.getState().view === 'Photos') {
      return <PhotoList />;
    } else {
      return <TripDashboard user={store.getState().user}/>;
    }
  }

  joinTrip(trip, updateBoard) {
    console.log('here with join trip info', trip);
    $.ajax({
      url: SERVER_URL + '/jointrip',
      method: 'POST',
      data: trip,
      success: (body) => {
        this.fetchLists();
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  createTrip(trip, updateBoard) {
    $.ajax({
      url: HOSTNAME + '/popup',
      method: 'POST',
      data: trip,
      success: (trip) => {
        this.fetchLists();
        updateBoard(trip);
        // console.log('POST for adding TRIP was a success', trip);
      },
      error: (err) => {
        console.log('error with POST when adding trip', err);
      }
    });
  }

  render() {
    return (
      <div>
        <JoinTrip joinTrip={this.joinTrip.bind(this)}/>
        <CreateTrip className="nav-link-text" createTrip={this.createTrip.bind(this)}/>
        <NavSideBar handleLogout={this.handleLogout.bind(this)} />
        <div className='content-wrapper'>
          <div className='container-fluid'>
            <div className='row btn-row'>
              {this.getViewComponent()}
            </div>
          </div>
        </div>
        <footer className='sticky-footer'>
          <div className='container'>
            <div className='text-center'>
              <small>made with love by the eggs, coffee & toast team</small>
            </div>
          </div>
        </footer>
        <a className='scroll-to-top rounded' href='#page-top'>
          <i className='fa fa-angle-up' />
        </a>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('app')
);
