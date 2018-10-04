const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String], // 문자열의 배열
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  }
});

module.exports = mongoose.model('post', postSchema);


