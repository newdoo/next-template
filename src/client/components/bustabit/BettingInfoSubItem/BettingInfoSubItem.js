import React from 'react'

import styles from './BettingInfoSubItem.scss';
import classNames from 'classnames/bind';

import ListItemText from '@material-ui/core/ListItemText'

import Cashout from '@common/cashout'

const cx = classNames.bind(styles);

const cashout = (index, length) => Cashout.getCashOut(length, index + 1)

const BettingInfo = ({value, index, length}) => {
  const result = cashout(index, length);
  return (
    <React.Fragment className={cx('content')}>
      <ListItemText className={cx(result.type)} primary={value.nick} />
      <ListItemText className={cx(result.type)} primary={value.distance.toFixed(2) + ' km'}/>
      <ListItemText className={cx(result.type)} primary={result.cashout + 'x / ' + result.profit}/>        
    </React.Fragment>
  );
  
};

export default BettingInfo;