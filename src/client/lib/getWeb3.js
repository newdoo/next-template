import Web3 from 'web3'
import config from '../../common/config.json'

const networkType = config[process.env.NODE_ENV].ethereumNetworkType

const getWeb3 = new Promise(function(resolve, reject) {
  try {
    window.addEventListener('load', function() {
      if (typeof window.web3 !== 'undefined') {
        resolve(new Web3(window.web3.currentProvider));
      } else {
        resolve(new Web3(new Web3.providers.HttpProvider(config.ethereumNetwork[networkType].url)));
      }
    })
  } catch (e) {
    resolve(new Web3(new Web3.providers.HttpProvider(config.ethereumNetwork[networkType].url)));
  }
})

export default getWeb3
