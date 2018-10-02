const config = require('../../../common/config')
const socket = new (require('blockchain.info/Socket'))({ network: config[process.env.NODE_ENV].bitcoinNetwork })

socket.on('utx', async(msg) => {
  console.log(msg.out[0].addr);
  console.log(msg.out[0].value);

  socket.op('addr_unsub', { addr: msg.out[0].addr });
  // const temp = await redis.get('master')('deposit.' + msg.out[0].addr);
  // const user = await redis.hget('master')(define.USER, temp.accountID);
});

const create = () => 'mzFpNnFbBZmVYsvmgSidxFqc1MS4wCNGRr'
  
const deposit = async(msg) => {
  socket.op('addr_sub', { addr: create() });
}

const handler = { deposit, }
module.exports = recv => handler[recv.type](recv.data)