const db = require('./index.js');

const photos = [];

const addUsers = () => {
  return db.Users.findOrCreate({where: {name: 'Neha Chaudhary', email: 'neha@gmail.com', password: 'blob', salt: 'neha'}})
    .then(() => db.Users.findOrCreate({where: {name: 'Eugene Soo', email: 'eugene@gmail.com', password: 'blob', salt: 'eugene'}}))
    .then(() => db.Users.findOrCreate({where: {name: 'Johnny Li', email: 'johnny@gmail.com', password: 'blob', salt: 'johnny'}}))
    .then(() => db.Users.findOrCreate({where: {name: 'Tiffany Pham', email: 'tiffany@gmail.com', password: 'blob', salt: 'tiffany'}}));
};

const addPhotos = () => {
  return db.Photos.findOrCreate({where: {name: 'np1.jpg', path: '/Trip-Images/HR-1/np1.jpg', tripId: 3}})
    .then(() => db.Photos.findOrCreate({where: {name: 'np2.jpg', path: '/Trip-Images/HR-1/np2.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np3.jpg', path: '/Trip-Images/HR-1/np3.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np4.jpg', path: '/Trip-Images/HR-1/np4.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np5.jpg', path: '/Trip-Images/HR-1/np5.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np6.jpg', path: '/Trip-Images/HR-1/np6.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np7.jpg', path: '/Trip-Images/HR-1/np7.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np8.jpg', path: '/Trip-Images/HR-1/np8.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np9.jpg', path: '/Trip-Images/HR-1/np9.jpg', tripId: 3}}))
    .then(() => db.Photos.findOrCreate({where: {name: 'np10.jpg', path: '/Trip-Images/HR-1/np10.jpg', tripId: 3}}));
};

const addExpenses = () => {

};

const dropDB = () => {

};

const addTrips = () => {
  return db.Trips.findOrCreate({where: {name: 'HR6', location: 'San Francisco', startDate: '2017-10-12', endDate: '2017-10-18', lodging: 'HR-6thFloor', accessCode: 'HR6', isopen: 'true'}})
    .then(() => db.Trips.findOrCreate({where: {name: 'HR7', location: 'San Jose', startDate: '2017-10-14', endDate: '2017-10-20', lodging: 'HR-7thFloor', accessCode: 'HR7', isopen: 'true'}}))
    .then(() => db.Trips.findOrCreate({where: {name: 'HR8', location: 'San Mateo', startDate: '2017-10-15', endDate: '2017-10-22', lodging: 'HR-8thFloor', accessCode: 'HR8', isopen: 'true'}}));

};

const addUserTrips = () => {

};

module.exports = {
  addUsers: addUsers,
  addPhotos: addPhotos,
  addExpenses: addExpenses,
  addTrips: addTrips,
  dropDB: dropDB,
  addUserTrips: addUserTrips
};

// INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Death', 'deadnotsleeping@gmail.com', 'DeathP', '1234', CURDATE(), CURDATE());
// INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Pestilence', 'admin@angularjs.com', 'PestilenceP', '5678', CURDATE(), CURDATE());
// INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('War', 'fitemeirl@hotmail.com', 'WarP', '91011', CURDATE(), CURDATE());
// INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Famine', '2hungry4u@yahoo.com', 'FamineP', '121314', CURDATE(), CURDATE());

// INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Amsterdames', 'Amsterdam', '2017-11-15', '2017-11-21', 'The Lawdge', 'A5678', true, CURDATE(), CURDATE());
// INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Oktobeerfest', 'Munich', '2017-10-20', '2017-10-30', 'Mein Haus', 'A1234', true, CURDATE(), CURDATE());

// INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA567', '867-5309', 1, 1, CURDATE(), CURDATE());
// INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA395', '555-5566', 1, 2, CURDATE(), CURDATE());
// INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('WOW1755', '867-1234', 2, 3, CURDATE(), CURDATE());
// INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('WOW5766', '444-5566', 2, 4, CURDATE(), CURDATE());