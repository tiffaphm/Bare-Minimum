// assume one trip row (obj) is being passed in
const data = {};

data.trip = {
  name: 'Amsterdames Spring Break',
  location: 'Amsterdam',
  startDate: (new Date('2018-03-20')).toString(),
  endDate: (new Date('2018-03-30')).toString(),
  lodging: 'Hotel Cardboard Box'
};

data.users = [
  {
    name: 'Death',
    email: 'deadnotsleeping@gmail.com'
  },
  {
    name: 'Pestilence',
    email: 'admin@angularjs.com'
  },
  {
    name: 'War',
    email: 'fitemeirl@hotmail.com'
  },
  {
    name: 'Famine',
    email: '2hungry4u@yahoo.com'
  }
];

data.features = [
  {
    name: 'trip home',
    link: 'TripDashboard'
  },
  // {
  //   name: 'Destinations',
  //   link: 'Landmarks'
  // },
  {
    name: 'expenses',
    link: 'ExpenseTracker'
  },
  {
    name: 'photos',
    link: 'Photos'
  },
  // {
  //   name: 'Dashboard',
  //   link: 'TripDashboard'
  // },
  {
    name: 'map',
    link: 'PlacesOfInterest'
  }
];

export default data;
