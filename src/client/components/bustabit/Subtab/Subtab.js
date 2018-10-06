import React from 'react'

import styles from './Subtab.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Subtab = ({select, onChange}) => (
  <div>
    <Tabs value={select} onChange={onChange} indicatorColor='primary' textColor='primary' fullWidth>
      <Tab label='Chatting'/>
      <Tab label='History'/>
    </Tabs>
  </div>
);

export default Subtab;