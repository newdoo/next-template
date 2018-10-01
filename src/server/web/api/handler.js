const crypto = require('../../utils/crypto')
const trustIP = require('../../utils/trustIP')

const router = {table: require('./table'), user: require('./user')}
const permission = {}

const toJson = data => JSON.parse(data)

module.exports = async(req, res) => {
  try {
    const recv = await crypto.decipher(req.params.msg.toString('hex'));
    console.log('\nrecv : ' + req.params.id + ' => ' + recv);

    if(permission[req.params.id] === 'admin') 
      if(trustIP(req) === false) return res.json({result: 'error', message: 'permission'});

    const result = await router[req.params.id](toJson(recv));
    res.json(await crypto.encryption(result));
    console.log('\nsend : ' + JSON.stringify(result));
  } catch (e) {
    console.log('qq');
    res.json({ result: e.message });
  }
}
