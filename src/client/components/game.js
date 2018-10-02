import io from 'socket.io-client'
import moment from 'moment'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import config from '../../common/config.json'
import { encryption, decipher } from '../lib/crypto'
import DataManager from '../lib/dataManager'

const easing = require('../../common/easing')

const styles = theme => ({
  root: {
    height: 250,
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

@observer class Game extends React.Component {  
  @observable remainTime = '0.0';
  @observable result = 0;

  bustInterval = null;

  componentDidMount = async() => {
    DataManager.socket = io(config[process.env.NODE_ENV].inGameURL);
    DataManager.socket.on('onGameInfo', this.onGameInfo);
    DataManager.socket.on('onGameEnter', this.onGameEnter);
  }

  onGameEnter = async(msg) => {
    msg = JSON.parse(await decipher(msg));

    this.updateGameState(msg.roundInfo);

    console.log('onGameEnter', msg.stops, msg.bettings);

    //DataManager.setStopList(msg.stops);
    msg.bettings.forEach(i => DataManager.addBettingData({nick: i.nick, state: 'betting', ...i}))
  }

  onGameInfo = async(msg) => {
    this.updateGameState(JSON.parse(await decipher(msg)));
  }

  updateGameState = msg => {
    console.log(msg);

    if(DataManager.state === msg.state) return;
    DataManager.state = msg.state;

    if(msg.state === 'ready') {
      this.onReady(msg);
    } else if(msg.state === 'start') {
      this.onStart(msg);
    } else if(msg.state === 'bust') {
      this.onBust(msg);
    }

  }

  onReady = msg => {
    DataManager.bettings.clear();

    const interval = setInterval(() => {
      const now = moment().utc();
      const remain = (5 - (now.diff(moment(msg.time)) / 1000)).toFixed(1);
      this.remainTime = remain <= 0 ? '0.0' : remain;
      
      if(remain < 0) {
        this.remainTime =  '0.0';
        clearInterval(interval);
      }
    }, 100);
  }

  onStart = msg => {
    let bust = 0;
    this.bustInterval = setInterval(() => {
      const now = moment().utc();
      bust = easing.easeInSine(now.diff(moment(msg.time)), 0, config.bustMaxValue, config.bustMaxTime);
      DataManager.setBust(bust.toFixed(2));
    }, 10);
  }

  onBust = (msg) => {
    clearInterval(this.bustInterval);
    this.result = msg.number.toFixed(2);
    //DataManager.history = DataManager.history.concat(msg);
  }

  none = () => {
    const {classes} = this.props;

    return (
      <CircularProgress className={classes.progress}/>
    )
  }

  ready = () => {
    const {isMobile, classes} = this.props;

    return (
      <Typography variant={isMobile ? 'display1' : 'display4'}>
        {this.remainTime} sec
      </Typography>
    )
  }

  start = () => {
    const {isMobile, classes} = this.props;

    return (
      <Typography variant={isMobile ? 'display1' : 'display4'} align='center'>
        {DataManager.bust} km
      </Typography> 
    )
  }

  bust = () => {
    const {isMobile} = this.props;

    return (
      <div>
        <Typography variant={isMobile ? 'display1' : 'display4'}>
          bust
        </Typography>
        <Typography variant='title' color='secondary'>
          {this.result} km
        </Typography> 
        <Typography variant='title'>
          update : {DataManager.bust}
        </Typography> 
      </div>
    )    
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        {DataManager.state === 'none' ? this.none() : DataManager.state === 'ready' ? this.ready() : DataManager.state === 'start' ? this.start() : DataManager.state == 'bust' ? this.bust() : '' }
      </Paper>
    )  
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
