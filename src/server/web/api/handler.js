const crypto = require('crypto-promise')
const config = require('../../../common/config')
const trustIP = require('../../utils/trustIP')

const router = {table: require('./table'), user: require('./user')}

const permission = {}

const decipher = async(data) => (await crypto.decipher('aes256', config.secret_client)(data, 'hex')).toString()
const encryption = async(data) => ((await crypto.cipher('aes256', config.secret_server)(JSON.stringify(data)))).toString('base64')
const toJson = data => JSON.parse(data)

module.exports = async(req, res) => {
  try {
    const recv = await decipher(req.params.msg.toString('hex'));
    console.log('\nrecv : ' + req.params.id + ' => ' + recv);

    if(permission[req.params.id] === 'admin') 
      if(trustIP(req) === false) return res.json({result: 'error', message: 'permission'});

    const result = await router[req.params.id](toJson(recv));
    res.json(await encryption(result));
    console.log('\nsend : ' + JSON.stringify(result));
  } catch (e) {
    console.log('qq');
    res.json({ result: e.message });
  }
}
