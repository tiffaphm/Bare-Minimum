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
    name: 'Share Expense',
    link: 'ExpenseTracker'
  },
  // {
  //   name: 'Destinations',
  //   link: 'Landmarks'
  // },
  {
    name: 'Calendar',
    link: 'some_link_to_calendar'
  },
  {
    name: 'Photos',
    link: 'Photos'
  },
  // {
  //   name: 'Dashboard',
  //   link: 'TripDashboard'
  // },
  {
    name: 'Trip Manager',
    link: 'TripManager'
  }
];

export default data;
