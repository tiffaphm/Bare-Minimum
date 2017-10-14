const http = require('./index.js');
const io = require('socket.io')(http);
const query = require('../database/queryHelpers.js');
let clientMap = {};

io.on('connection', (socket) => {

  query.getChats()
    .then(chats => {
      console.log('received chats from database on load', chats);
      socket.emit('chat message', chats);
    });

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

  socket.on('BULBASAUR', function(msg) {
    console.log(msg);
  });

  socket.on('chat message', (message) => {
    queryHelpers.addChatMessage(message)
      .then(result => { 
        console.log('recevied from database chat', result);
      })
      .catch(err => console.log('error adding chat to database', err));
  });

});

const sendNotification = (notification) => {
  io.to(notification.tripId).emit('new notification', JSON.stringify(notification));
};

module.exports = {
  sendNotification: sendNotification
};