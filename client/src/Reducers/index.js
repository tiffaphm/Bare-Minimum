const APP_VIEWS = require('../appViewsList').APP_VIEWS;

/*
SYMBOLS - How a user might alter state
*/

const CHANGE_USER = 'CHANGE_USER';
const CHANGE_TRIP = 'CHANGE_TRIP';
const CHANGE_VIEW = 'CHANGE_VIEW';
const CHANGE_PHOTOS = 'CHANGE_PHOTOS';

/*
ACTIONS
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

/*
REDUCERS
*/

const initialState = {
  photos: [],
  user: '',
  trip: '',
  view: 'TripManager'
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
  default:
    return state;
  }
};

module.exports = {
  travelReducer,
  changeUser,
  changeTrip,
  changeView,
  changePhotos
};

/*
Usage:
  store.dispatch(changeUser('ChristieV'));
  store.dispatch(changeTrip('Poveglia'));
*/
