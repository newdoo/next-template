const db = require('../../mongoDB/schema')

const writePost = async(msg) => { 

  console.log(msg.post.title);
  console.log(msg.post.body);
  console.log(msg.post.tags);

  // 새 Post 인스턴스를 생성합니다.
  const post = new db.postSchema({
    title: msg.post.title, 
    body: msg.post.body, 
    tags: msg.post.tags
  });
  await post.save(); // 데이터베이스에 등록합니다.

  return {'result': 'ok', 'data': post };
}

const getPost = async(msg) => {

  const post = await db.postSchema.findById(msg.id).exec();

  return {'result': 'ok', 'data': post};
}

const handler = { writePost, getPost }
module.exports = recv => handler[recv.type](recv.data)