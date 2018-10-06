import React from 'react'

import styles from './BettingInfo.scss';
import classNames from 'classnames/bind';

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import BettingInfoSubItem from '@components/bustabit/BettingInfoSubItem'

const cx = classNames.bind(styles);

const BettingInfo = ({bettings, onClick, src}) => (
  <Paper className={cx('content','root')}>
    <Typography>Bet List</Typography>
    <List className={cx('list')}>
      { 
        bettings.filter(value => value.state === 'stop').sort((a, b) => a.distance > b.distance ? -1 : 1).map((value, index) => (
          <ListItem dense button key={value.id} onClick={onClick(value.account)}>
            <Avatar className={cx('avatar')} src={src}></Avatar>
            <BettingInfoSubItem 
              value={value}
              index={index}
              length={bettings.length}
              />
          </ListItem>
        ))
      }
      { 
        bettings.filter(value => value.state === 'betting').map(value => (
          <ListItem dense button key={value.id} onClick={onClick(value.account)}>
            <Avatar className={cx('avatar')} src={src}></Avatar> 
            <ListItemText primary={value.nick}/>
          </ListItem>
        ))
      }
    </List>
  </Paper>
);

export default BettingInfo;