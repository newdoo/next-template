const redis = require('../utils/redis')

const load = recv => redis.get(recv.data.name) 
const save = recv => redis.set(recv.data.name, recv.data.table)

module.exports = {save, load}
