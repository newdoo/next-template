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

const getPostList = async(msg) => {

  // page가 주어지지 않았다면 1로 간주
  // query는 문자열 형태로 받아 오므로 숫자로 변환
  const page = parseInt(msg.page || 1, 10);

  const query = msg.tag ? {
    tags: tag // tags 배열에 tag를 가진 포스트 찾기
  } : {};

  // 잘못된 페이지가 주어졌다면 에러
  if (page < 1) {
    return { result: 'error' };
  }

  const posts = await db.postSchema.find(query)
    .sort({ _id: -1 })
    .limit(10)
    .skip((page - 1) * 10)
    .lean()
    .exec();

  const postCount = await db.postSchema.countDocuments(query).exec();
  const limitBodyLength = post => ({
    ...post,
    body: post.body.length < 350 ? post.body : `${post.body.slice(0, 350)}...`
  });

  return {'result': 'ok', 'data': posts.map(limitBodyLength), 'lastpage': Math.ceil(postCount / 10)};
}

const handler = { writePost, getPost, getPostList }
module.exports = recv => handler[recv.type](recv.data)