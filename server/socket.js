const http = require('./index.js');
const io = require('socket.io')(http);
const query = require('../database/queryHelpers.js');


io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    query.findTripsForUser(socket.userId)
      .then((results) => {
        for (let result of results) {
          socket.leave(`${result.id}`);
        }
        return null;
      });
  });

  socket.on('report', (info) => {
    console.log(`user: ${info.userId} report with socket: ${socket.id}`);
    socket.userId = info.userId;
    query.findTripsForUser(info.userId)
      .then((results) => {
        for (let result of results) {
          socket.join(`${result.id}`);
        }
        return null;
      });
  });
});

const sendNotification = (notification) => {
  io.to(notification.tripId).emit('new notification', JSON.stringify(notification));
};

module.exports = {
  sendNotification: sendNotification
};