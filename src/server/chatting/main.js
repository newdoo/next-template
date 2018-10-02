const config = require('../../common/config')
const io = require('socket.io').listen(config[process.env.NODE_ENV].chattingURL.split(':')[2])
const redis = require('../utils/redis')

io.sockets.on('connection', socket => {
  socket.on('disconnect', function () {
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('onChannel');
    socket.removeAllListeners('onChattingMessage');
  });
  
  socket.on('onChannel', async(msg) => {
    socket.join(msg.channel);

    const result = await redis.lrange(msg.channel, 0, -1);
    if(result.length === 0) return;
    socket.emit('onList', result);
  });

  socket.on('onChattingMessage', async(msg) => {
    redis.rpush(msg.channel, msg).then(async(result) => {
      const count = await redis.llen(msg.channel)
      if(count > 100) redis.lpop(msg.channel);
    });

    socket.broadcast.to(msg.channel).emit('onChattingMessage', msg);
  });
});