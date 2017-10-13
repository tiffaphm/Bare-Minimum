const http = require('./index.js');
const io = require('socket.io')(http);
let clientMap = {};

io.on('connection', (socket) => {

  console.log(`${socket.id} connected`);
  io.emit('testmessage', 'test');
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);

  });

  socket.on('report', (info) => {
    console.log(`user: ${info.userId} in trip: ${info.tripId} report with socket: ${socket.id}`);
    if (clientMap[tripId]) {
      clientMap[tripId].push(socket.id);
    } else {
      clientMap[tripId] = [socket.id];
    }
  });

  socket.on('BULBASAUR', function(msg) {
    console.log(msg);
  });

});

const sendNotification = (notification) => {
  if (clientMap[notification.tripId]) {
    for (let userId of clientMap[notification.tripId]) {
      
    }
    io.to(queueMap[queueId]).emit('new notification', JSON.stringify(notification));
  }
};

module.exports = {
  sendNotification: sendNotification
};