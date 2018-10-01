const config = require('../common/config')
const io = require('socket.io').listen(config.chatting_port)

io.sockets.on('connection', socket => {
  socket.emit('connection', { type : 'connected' });

  socket.on('join', data => {
    socket.join(data.room);
    //socket.set('room', data.room);
  });

  socket.on('chatting', data => {
    socket.broadcast.to(data.room).emit('message', data.message);
  });
});
