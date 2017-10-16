const db = require('./index.js');
const Sequelize = require('sequelize');

// ==== USERS ====

const addUser = function(user, callback) {
  db.Users.create(user)
    .then(() => {
      return callback();
    })
    .catch((err) => {
      console.error('there was an error on user database insert ', err.message);
      callback(err);
    }).catch((err) => {
      console.error('Bad username request! Name may be taken.');
    });
};

const findUser = function(user, callback) {
  db.Users.findAll({where: {name: user.name}})
    .then((foundUser) => {
      callback(foundUser);
    })
    .catch((err) => {
      console.error('There was an error in user lookup', err);
    });
};

const findUserByEmail = function(user, callback) {
  db.Users.findAll({where: {email: user.name}})
    .then((foundUser) => {
      return callback(foundUser);
    })
    .catch((err) => {
      console.error('There was an error in user lookup', err);
    });
};

// ==== USERS & TRIPS ====

const findUsersOnTrip = (tripId) => {
  // query equivalent to:
  // `SELECT Users.name, Users.id FROM UserTrips, Users WHERE Users.id = UserTrips.UserId AND UserTrips.tripId = ${tripId}`
  return db.db.query(`select usertrips.flightItinerary, usertrips.phone, users.name, users.id from usertrips inner join users where users.id = usertrips.UserId and usertrips.TripId = ${tripId}`, { type: Sequelize.QueryTypes.SELECT});
};

const findTripsForUser = (userId) => {
  return db.Trips.findAll({
    include: [{
      model: db.Users,
      where: { id: userId }
    }]
  });
};

// TODO: setUserTripDetails

// get trip-specific user details (itinerary, phone)
const getUserTripDetails = function(userId, tripId, callback) {
  console.log(userId, tripId);

  db.UserTrip.findOne({ where: { TripId: tripId, UserId: userId } })
    .then((result) => {
      return callback(result);
    })
    .catch((err) => {
      console.error('There was an error looking up user details', err);
      return callback(err);
    });
};

const updateUserTripDetails = function(userId, tripId, itinerary, phone, callback) {
  console.log(userId, tripId);

  db.UserTrip.update({ flightItinerary: itinerary, phone: phone },
    {
      where: {
        TripId: tripId,
        UserId: userId
      }
    })
    .then((result, data) => {
      console.log('SET USER DETAILS');
      return callback(result);
    })
    .catch((err) => {
      console.error('There was an error setting user details', err);
      return callback(err);
    });
};

// ==== SESSIONS =====

//this helper function can be used to add foreign keys between users and sessions... not sure if neccessary
const addSession = function(sessionId, email) {
  console.log('this is db helper ', sessionId, email);
};

// Notifications

const getDetailedNotification = (notification) => {
  if (notification.type === 'expense') {
    return db.db.query(`select notifications.id, notifications.type, notifications.createdAt, notifications.tripId as tripId, expenses.amount, expenses.description, trips.name as tripsName, expenses.userId, users.name FROM notifications, expenses, trips, users WHERE notifications.contentId = expenses.id AND notifications.tripId = trips.id AND users.id = expenses.userId AND notifications.id = ${notification.id};`, { type: Sequelize.QueryTypes.SELECT});
  } else if (notification.type === 'photo') {
    return db.db.query(`select notifications.id, notifications.type, notifications.createdAt, notifications.tripId as tripId, photos.path, trips.name as tripsName, photos.userId, users.name FROM notifications, photos, trips, users WHERE notifications.contentId = photos.id AND notifications.tripId = trips.id AND users.id = photos.userId AND notifications.id = ${notification.id};`, { type: Sequelize.QueryTypes.SELECT});
  }
};

const getNotificationForTrip = (tripId) => {
  return db.Notifications.findAll({ 
    where: { tripId: tripId },
    ordering: [['createdAt', 'DESC']]
  })
    .then((results) => {
      let promises = [];
      for (let result of results) {
        promises.push(getDetailedNotification(result.dataValues));
      }
      return Promise.all(promises);
    });
};

const getNotificationForUser = (userId) => {
  return findTripsForUser(userId)
    .then((results) => {
      let promises = [];
      for (let result of results) {
        promises.push(getNotificationForTrip(result.dataValues.id));
      }
      return Promise.all(promises);
    });
};

const generateNotification = (tripId, type, contentId) => {
  return db.Notifications.create({ tripId: tripId, type: type, contentId: contentId });
};

// ==== TRIPS ====

const createTrip = function(trip, callback) {
  db.Trips.create(trip)
    .then((result) => {
      callback(result.dataValues);
      return db.UserTrip.create({
        flightItinerary: '',
        phone: '',
        UserId: trip.userId,
        TripId: result.dataValues.id
      });
    })
    .catch((err) => {
      console.error('Trip name already exist please try a new name. ', err);
      callback(err);
    });
};

const joinTrip = function(body, callback) {
  db.Trips.findOne({where: {accessCode: body.accessCode}})
    .then((trip) => {
      if (trip) {
        return db.UserTrip.create({
          flightItinerary: '',
          phone: '',
          UserId: body.userId,
          TripId: trip.id
        })
          .then(() => {
            return callback();
          });
      } else {
        callback('trip did not exist');
      }
    });
};

// ==== LANDMARKS ====

const addLandmark = function(landmark, callback) {
  db.Users.findOne({where: {email: landmark.user}})
    .then ((user) => {
      return db.Landmarks.create({
        url: landmark.url,
        description: landmark.description,
        address: landmark.address,
        tripId: landmark.tripId,
        userId: user.id
      });
    })
    .then(() => {
      return callback();
    })
    .catch((err) => {
      console.log('there was an error on landmark create', err);
    });
};

const findLandmarks = function(tripId, callback) {
  db.Landmarks.findAll({
    where: {tripId: tripId},
    limit: 20,
    attributes: ['url', 'description', 'address', 'id'],
    include: [{model: db.Users, attributes: ['name', 'id']}]
  })
    .then((landmarks) => {
      let promise = landmarks.map((landmark) => {
        return db.Votes.findAll({where: {landmarkId: landmark.id}})
          .then((votes) => {
            landmark.dataValues.votes = votes;
            return landmark;
          });
      });
      Promise.all(promise)
        .then((results) => {
          return callback(results);
        });
    })
    .catch((err) => {
      console.log('there was an error finding Landmarks ', err);
    });
};

// ==== EXPENSES ==== 

const createExpense = function(options) {
  return db.Expenses.create(options)
    .then((result) => {
      // generate a notification
      return generateNotification(options.tripId, 'expense', result.dataValues.id);
    })
    .then((notiResult) => {
      return getDetailedNotification(notiResult.dataValues);
    });
};

const getExpensesForTrip = function(targetId) {
  console.log('Database searching for expenses with tripId', targetId);
  return new Promise ((resolve, reject) => {
    return db.Expenses.findAll({ where: { tripId: targetId } })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error('There was an error looking up expenses for trip', err);
        reject(err);
      });
  });
};

const findPhotos = (tripId) => {
  return db.Photos.findAll({where: tripId});
};

const addPhotos = (images) => {
  let promises = [];
  for (let image of images) {
    promises.push(
      db.Photos.create(image)
        .then((result) => {
          // generate a notification
          return generateNotification(images[0].tripId, 'photo', result.dataValues.id);
        })
        .then((notiResult) => {
          return getDetailedNotification(notiResult.dataValues);
        })
    );
  }
  return Promise.all(promises);
  
  // return db.Photos.bulkCreate(images)
  //   .then(bulkResult => db.Photos.findAll({where: {tripId: images[0].tripId}}))

};

const findOnePhoto = (tripId) => {
  return db.Photos.findOne({where: {tripId: tripId}});
};

const addChatMessage = (chatInfo) => {
  return db.Chat.create(chatInfo);
};

const getChatsForTrip = (id) => {
  return db.Chat.findAll({where: {tripId: id}});
};

const addPlaceOfInterest = (place) => {
  return db.PlacesOfInterest.create(place);
};

const getPlacesOfInterest = (id) => {
  return db.PlacesOfInterest.findAll({where: {tripId: id, status: 'saved'}});
};

const updatePlacesOfInterest = (placeid, tripid) => {
  return db.PlacesOfInterest.update({status: 'unsaved'}, {where: {place_id: placeid, status: 'saved'}});
};

module.exports = {
  addUser: addUser,
  findUser: findUser,
  addSession: addSession,
  findUsersOnTrip: findUsersOnTrip,
  createTrip: createTrip,
  addLandmark: addLandmark,
  findLandmarks: findLandmarks,
  findUserByEmail: findUserByEmail,
  findTripsForUser: findTripsForUser,
  createExpense: createExpense,
  getExpensesForTrip: getExpensesForTrip,
  joinTrip: joinTrip,
  getUserTripDetails: getUserTripDetails,
  updateUserTripDetails: updateUserTripDetails,
  findPhotos: findPhotos,
  getNotificationForTrip: getNotificationForTrip,
  addPhotos: addPhotos,
  getNotificationForUser: getNotificationForUser,
  addChatMessage: addChatMessage,
  getChatsForTrip: getChatsForTrip,
  addPlaceOfInterest: addPlaceOfInterest,
  getPlacesOfInterest: getPlacesOfInterest,
  updatePlacesOfInterest: updatePlacesOfInterest,
  findOnePhoto: findOnePhoto
};


  // queryHelpers.getChats()
  //   .then(chats => {
  //     console.log('received chats from database on load', chats);
  //     socket.emit('chat message', chats);
  //   });
