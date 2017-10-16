const db = require('./index.js');

const photos = [
  {name: 'np1.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771734/t1e319xpjoypglffj89x.jpg', tripId: 1, userId: 1},
  {name: 'np2.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771734/jvn8lnjavwwlnktxqrng.jpg', tripId: 1, userId: 1},
  {name: 'np3.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771734/btjf28tjumy4nhw4udyb.jpg', tripId: 1, userId: 1},
  {name: 'np4.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771734/nz7ouq1gixilrkgphkof.jpg', tripId: 3, userId: 1},
  {name: 'np5.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771811/hdv1ktdyy9w4g50cge6c.jpg', tripId: 3, userId: 1},
  {name: 'np6.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771811/dioodkqeos4k7rlmtnpv.jpg', tripId: 3, userId: 1},
  {name: 'np7.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771811/kb1guzptx3v22yu8icxm.jpg', tripId: 3, userId: 1},
  {name: 'np8.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771827/m1u9zjb38xwdsg3jvh34.jpg', tripId: 3, userId: 1},
  {name: 'np9.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771828/dc6zyd625ksh4rhalzgz.jpg', tripId: 3, userId: 1},
  {name: 'np10.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507771828/bkcadfbeotsuske7w5tl.jpg', tripId: 3, userId: 1},
  {name: 'np11.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507842415/x6j29slguzd78qrykqq6.jpg', tripId: 3, userId: 1},
  {name: 'np12.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507858613/lmodccpd7f1cf0gz7ihv.jpg', tripId: 3, userId: 1},
  {name: 'np13.jpg', path: 'https://res.cloudinary.com/djffzbz5m/image/upload/v1507856406/gldloixnpfxkvigvi5zw.jpg', tripId: 3, userId: 1},
  {name: 'np13.jpg', path: 'http://res.cloudinary.com/djffzbz5m/image/upload/v1507855409/iimns71emzcl4a515n5q.jpg', tripId: 3, userId: 1}
];

const sharedTrips = [
  {flightItinerary: 'AA567', phone: '867-5309', TripId: 1, UserId: 1},
  {flightItinerary: 'AA395', phone: '555-5566', TripId: 1, UserId: 2},
  {flightItinerary: 'WOW1755', phone: '867-1234', TripId: 3, UserId: 1},
  {flightItinerary: 'WOW5766', phone: '444-5566', TripId: 3, UserId: 3},

]; 

const addUsers = () => {
  return db.Users.findOrCreate({where: {name: 'Neha Chaudhary', email: 'neha@gmail.com', password: 'blob', salt: 'neha'}})
    .then(() => db.Users.findOrCreate({where: {name: 'Eugene Soo', email: 'eugene@gmail.com', password: 'blob', salt: 'eugene'}}))
    .then(() => db.Users.findOrCreate({where: {name: 'Johnny Li', email: 'johnny@gmail.com', password: 'blob', salt: 'johnny'}}))
    .then(() => db.Users.findOrCreate({where: {name: 'Tiffany Pham', email: 'tiffany@gmail.com', password: 'blob', salt: 'tiffany'}}));
};

const addTrips = () => {
  return db.Trips.findOrCreate({where: {name: 'HR-6th Floor', location: 'San Francisco', startDate: '2017-10-12', endDate: '2017-10-18', lodging: 'HR-6thFloor', accessCode: 'HR6', isopen: 'true'}})
    .then(() => db.Trips.findOrCreate({where: {name: 'HR7', location: 'San Jose', startDate: '2017-10-14', endDate: '2017-10-20', lodging: 'HR-7thFloor', accessCode: 'HR7', isopen: 'true'}}))
    .then(() => db.Trips.findOrCreate({where: {name: 'HR-8th Floor', location: 'San Francisco', startDate: '2017-10-15', endDate: '2017-10-22', lodging: 'HR-8thFloor', accessCode: 'HR8', isopen: 'true'}}));

};

const addChats = () => {
  return db.Chat.findOrCreate({where: {username: 'Neha Chaudhary', message: 'hello', userId: '1', tripId: '1', sentTo: 'group' }})
    .then(() => db.Chat.findOrCreate({where: {username: 'Neha Chaudhary', message: 'hello', userId: '1', tripId: '3', sentTo: 'group' }}))
    .then(() => db.Chat.findOrCreate({where: {username: 'Eugene Soo', message: 'heyyyy', userId: '2', tripId: '1', sentTo: 'group' }}))
    .then(() => db.Chat.findOrCreate({where: {username: 'Neha Chaudhary', message: 'user chatt', userId: '1', tripId: '1', sentTo: 'Eugene' }}))
    .then(() => db.Chat.findOrCreate({where: {username: 'Johnny Li', message: 'heyyyy', userId: '3', tripId: '3', sentTo: 'group' }}))
    .then(() => db.Chat.findOrCreate({where: {username: 'Neha Chaudhary', message: 'are you awake', userId: '1', tripId: '3', sentTo: 'Johnny' }}))
    .then(() => db.Chat.findOrCreate({where: {username: 'Neha Chaudhary', message: 'yes I am looking for places we can go to', userId: '1', tripId: '3', sentTo: 'Eugene' }}));
};

const addPhotos = () => {
  return db.Photos.bulkCreate(photos);
};

const addExpenses = () => {

};

const addUserTrips = () => {
  return db.UserTrip.bulkCreate(sharedTrips);
};

const addData = () => {
  return addUsers()
    .then(() => addTrips())
    .then(() => addPhotos())
    .then(() => addUserTrips())
    .then(() => addChats());
};

module.exports = {
  addData: addData,
};
