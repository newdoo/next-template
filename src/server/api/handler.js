const crypto = require('crypto-promise')
const config = require('../../common/config')
const trustIP = require('../utils/trustIP')

const router = {table: require('./table')}

const permission = {}

const decipher = async(data) => (await crypto.decipher('aes256', config.secret)(data, 'hex')).toString()
const toJson = data => JSON.parse(data)

module.exports = async(req, res) => {
  try {
    console.log('q');
    const recv = await decipher(req.params.msg.toString('hex'));
    console.log('\nrecv => \n' + req.params.id + ' : ' + recv);

    if(permission[req.params.id] === 'admin') 
      if(trustIP(req) === false) return res.json({result: 'error', message: 'permission'});

    const result = await router[req.params.id](toJson(recv));
    res.json(result);   
    console.log('\nsend => \n' + JSON.stringify(result));
  } catch (e) {
    console.log('qq');
    res.json({result: 'error', message: e.message});
  }
}
