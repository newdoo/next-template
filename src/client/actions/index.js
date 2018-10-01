import * as balanceAction from './balanceAction'
import * as userAction from './userAction'

const ActionCreators = Object.assign({},
  balanceAction,
  userAction
);

export default ActionCreators
