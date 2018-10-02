const mongoose = require('mongoose')
const config = require('../../common/config')
mongoose.set('useFindAndModify', false)

module.exports = () => {
  const connect = () => {
    mongoose.connect(config[process.env.NODE_ENV].mongodb, { useNewUrlParser: true, dbName: 'db' }, err => {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected...');
    });  
  }

  connect();
  mongoose.connection.on('disconnected', connect);
  
  require('./schema')
}