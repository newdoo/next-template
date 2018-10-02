import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Register from 'components/register'
import DataManager from 'lib/dataManager'
import { encryption, decipher } from '../lib/crypto'
import config from '../../common/config.json'
const easing = require('../../common/easing')

const styles = theme => ({
  root: {
    height: 250,
    margin: theme.spacing.unit,
  },
  content: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


@observer class GameInfo extends React.Component {
  @observable oneClick = false;

  componentDidMount = async() => {
    DataManager.socket.on('onGameBetting', this.onGameBetting);
    DataManager.socket.on('onGameStop', this.onGameStop);
  }

  onGameBetting = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));

    console.log('onGameBetting', msg);

    DataManager.addBettingData({nick: msg.nick, state: 'betting', ...msg});
    const time = moment().utc().valueOf();
    const start = 0;
    const dest = config.bettingValue;
    const balance = DataManager.balance();

    const interval = setInterval(() => {
      const now = moment().utc();
      const value = easing.easeInSine(now.diff(moment(time)), start, dest, 500);
      DataManager.setUser(DataManager.nick(), balance - Number(value).toFixed(0));

      if(value >= dest) {
        clearInterval(interval);
        DataManager.setUser(DataManager.nick(), Number(balance - config.bettingValue));
      }
    }, 10);
  }

  onGameStop = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));

    console.log('onGameStop', msg);

    // 해당 유저의 배팅 기록이 없다.
    if(DataManager.bettings.has(msg.nick) === false) return;

    DataManager.bettings.delete(msg.nick);
    DataManager.addBettingData({nick: msg.nick, state: 'stop', distance: Number(msg.time), ...msg});
  }

  onBet = async() => {
    this.oneClick = true;
    DataManager.socket.emit('onGameBetting', await encryption({nick: DataManager.nick()}));
  }

  onStop = async() => {
    this.oneClick = true;
    DataManager.socket.emit('onGameStop', await encryption({nick: DataManager.nick()}));
  }

  @action isStop = () => {
    const item = DataManager.bettingList.find(i => DataManager.nick() === i.nick);
    if(item === undefined) return true;
    return item.state === 'stop' ? true : false;
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Game Info</Typography>
        {DataManager.nick() === '' ? <Register/> : 
          <div className={classes.content}>
            <Typography>my balance : {DataManager.balance()}</Typography>
            <Typography>players : {DataManager.bettingList.length}</Typography>
            <Typography>bet : {DataManager.bettingList.length * 100}</Typography>
            {
              DataManager.state === 'ready' ? 
              <Button className={classes.button} variant='outlined' onClick={this.onBet} disabled={this.onClick || DataManager.bettings.has(DataManager.nick())}>Bet</Button> : 
              DataManager.state === 'start' ?
              <Button className={classes.button} variant='outlined' onClick={this.onStop} disabled={this.onClick || this.isStop()}>Stop</Button> :
              ''
            }
          </div>
        }
      </Paper>
    )  
  }
}

GameInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameInfo);
