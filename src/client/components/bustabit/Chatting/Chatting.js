import React from 'react';
import styles from './Chatting.scss';
import classNames from 'classnames/bind';

import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

const cx = classNames.bind(styles);

const Chatting = ({chattingList, disabled, onKeyPress}) => (
  <div>
    <List className={cx('content','list')}>
      {
        chattingList.map(value => (
            <Typography key={value.id} align='left' className={cx('item')}>{value.nick + ' : ' + value.message}</Typography>
        ))
      }
    </List>
    <Input
      className={cx('input')}
      disabled={disabled} 
      placeholder='enter message' 
      inputProps={{'aria-label': 'Description'}} 
      onKeyPress={onKeyPress}
    />
  </div>
);

export default Chatting;