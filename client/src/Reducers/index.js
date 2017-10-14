import { combineReducers } from 'redux';
import $ from 'jquery';

const APP_VIEWS = require('../appViewsList').APP_VIEWS;

/*
SYMBOLS - How a user might alter state
*/

const CHANGE_USER = 'CHANGE_USER';
const CHANGE_TRIP = 'CHANGE_TRIP';
const CHANGE_VIEW = 'CHANGE_VIEW';
const CHANGE_PHOTOS = 'CHANGE_PHOTOS';
const SHOW_MORE = 'SHOW_MORE';
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

/*
ACTION CREATORS
*/
const changeUser = (user = '') => ({
  type: CHANGE_USER,
  user
});

const changeTrip = (trip = '') => ({
  type: CHANGE_TRIP,
  trip
});

const changeView = (view = '') => ({
  type: CHANGE_VIEW,
  view
});


const changePhotos = (photos = []) => ({
  type: CHANGE_PHOTOS,
  payload: photos
});

const showMore = (notificationsCount = 10) => ({
  type: SHOW_MORE,
  notificationsCount
});

const updateNotifications = (updatedNotifications) => ({
  type: UPDATE_NOTIFICATIONS,
  payload: updatedNotifications
});

/*
REDUCERS
*/

const initialState = {
  photos: [],
  user: '',
  trip: '',
  view: 'TripManager',
  notifications: [
    {
      id: 1,
      name: 'Johnny',
      event: 'add photo',
      createdAt: '2017-10-10 19:06:27'
    },
    {
      id: 2,
      name: 'Tiff',
      event: 'add photo',
      createdAt: '2017-10-12 11:06:27'
    },
    {
      id: 3,
      name: 'Neha',
      event: 'add message',
      createdAt: '2017-10-10 19:06:27'
    },
    {
      id: 4,
      name: 'Tiff',
      event: 'add photo',
      createdAt: '2017-10-12 11:06:27'
    },
    {
      id: 5,
      name: 'Neha',
      event: 'add message',
      createdAt: '2017-10-10 19:06:27'
    },
    {
      id: 6,
      name: 'Neha',
      event: 'add message',
      createdAt: '2017-10-10 19:06:27'
    }
  ] 
};

const travelReducer = (state = initialState, action) => {
  // console.log('Store action:', action);

  switch (action.type) {
  case CHANGE_USER:
    return Object.assign({}, state, {user: action.user});
  case CHANGE_TRIP:
    return Object.assign({}, state, {trip: action.trip});
  case CHANGE_VIEW:
    return Object.assign({}, state, {view: action.view});
  case CHANGE_PHOTOS:
    return Object.assign({}, state, {photos: action.payload});
  case UPDATE_NOTIFICATIONS:
    return Object.assign({}, state, {notifications: action.payload});
  default:
    return state;
  }
};

module.exports = {
  travelReducer,
  changeUser,
  changeTrip,
  changeView,
  changePhotos,
  updateNotifications
};

/*
Usage:
  store.dispatch(changeUser('ChristieV'));
  store.dispatch(changeTrip('Poveglia'));
*/
