const config = require('../../common/config')
const io = require('socket.io').listen(config[process.env.NODE_ENV].chattingURL.split(':')[2])

io.sockets.on('connection', socket => {
  
  socket.on('disconnect', function () {
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('onChannel');
    socket.removeAllListeners('onChattingMessage');
  });
  
  socket.on('onChannel', data => {
    socket.join(data.channel);
  });

  socket.on('onChattingMessage', data => {
    socket.broadcast.to(data.channel).emit('onChattingMessage', data.message);
  });
});
