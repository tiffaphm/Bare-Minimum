const http = require('./index.js');
const io = require('socket.io')(http);
let clientMap = {};

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('report', (info) => {
    console.log(`user: ${info.userId} in trip: ${info.tripId} report with socket: ${socket.id}`);
    if (clientMap[tripId]) {
      clientMap[tripId].push(socket.id);
    } else {
      clientMap[tripId] = [socket.id];
    }
  });


});

const sendNotification = (notification) => {
  if (clientMap[notification.tripId]) {
    for (let userId of clientMap[notification.tripId]) {
      
    }
    io.to(queueMap[queueId]).emit('noti', 'your table is ready!');
  }
};

module.exports = {
  sendNotification: sendNotification
};