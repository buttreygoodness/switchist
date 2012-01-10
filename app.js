var io = require('socket.io').listen(3030);

io.sockets.on('connection', function (socket) {
  socket.on('change location', function (data) {
    console.log('got changelocation');
    io.sockets.emit('window location', data);
  });
});