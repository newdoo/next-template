import React from 'react';
import styles from './Ready.scss';
import classNames from 'classnames/bind';

import Typography from '@material-ui/core/Typography';

const cx = classNames.bind(styles);

const Ready = ({isMobile, remainTime}) => (
  <Typography className={cx('content','time')} variant={isMobile ? 'display1' : 'display4'} align='right'>
    {remainTime.toFixed(1)} sec
  </Typography>
);

export default Ready;