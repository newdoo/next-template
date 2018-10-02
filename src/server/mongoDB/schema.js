const mongoose = require('mongoose')
const moment = require('moment')

const userSchema = new mongoose.Schema({
  nick: {type: String, index: true, required: true, unique: true},
  account: {type: String, index: true, required: true, unique: true},
  date: {type: Number, default: moment().utc().valueOf()},
  pass: {type: String, required: true},
  balance: Number,
  followers: [String],
});

const historySchema = new mongoose.Schema({
  kind: {type: String, index: true, required: true},
  date: {type: Number, index: true, default: moment().utc().valueOf()},
  balance: {type: Number},
  account: {type: String, index: true, required: true},
  data: JSON,
});

const logSchema = new mongoose.Schema({
  kind: {type: String, index: true, required: true},
  date: {type: Number, default: moment().utc().valueOf()},
  betting: [String],
  seed: String,
  number: Number,
});

const depositSchema = new mongoose.Schema({
  kind: {type: String, index: true},
  date: {type: Number, default: moment().utc().valueOf()},
  balance: {type: Number},
  account: {type: String, index: true, required: true},
  address: String,
});

const chattingSchema = new mongoose.Schema({
  users: {type: [String], index: true, required: true},
  nicks: {type: [String], require: true},
  date: Number,
  message: String,
});

module.exports = {
  userSchema: mongoose.model('user', userSchema),
  historySchema: mongoose.model('history', historySchema),
  depositSchema: mongoose.model('deposit', depositSchema),
  logSchema: mongoose.model('log', logSchema),
  chattingSchema: mongoose.model('chatting', chattingSchema),
}