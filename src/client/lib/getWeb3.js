import Web3 from 'web3'
const config = require('../../common/config') 
const networkType = config[process.env.NODE_ENV].ethereumNetworkType

const getWeb3 = new Promise(function(resolve, reject) {
  try {
    window.addEventListener('load', function() {
      var web3 = window.web3;
      if (typeof web3 !== 'undefined') {
        resolve(new Web3(web3.currentProvider));
      } else {
        var provider = new Web3.providers.HttpProvider(config.ethereumNetwork[networkType].url);
        resolve(null);
      }
    })
  } catch (e) {
    var provider = new Web3.providers.HttpProvider(config.ethereumNetwork[networkType].url);
    resolve(new Web3(provider));
  }
})

export default getWeb3
