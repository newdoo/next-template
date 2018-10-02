const cashout = require('../../common/cashout')

let rewards = {};

module.exports = max => {
  if(rewards[max] !== undefined) return rewards[max];

  let list = []
  for(let i=1; i<=max; i++)
    list.push(cashout.getCashOut(max, i));

  rewards[max] = list;
  return rewards[max]; 
}