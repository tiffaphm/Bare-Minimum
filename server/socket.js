const http = require('./index.js');
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
});

const test = () => {

};

module.exports = {
  test: test
}