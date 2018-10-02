const db = require('../../mongoDB/schema')

const list = async(msg) => {return {result: 'ok', history: await db.logSchema.find().where('kind').equals(msg.kind).skip(msg.start).limit(msg.count)}}

const handler = { list }
module.exports = recv => handler[recv.type](recv.data)