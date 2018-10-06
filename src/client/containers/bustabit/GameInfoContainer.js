import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { encryption, decipher } from '@lib/crypto'
import config from '@common/config.json'
import Socket from '@lib/socket'
import updateBalance from '@lib/updateBalance'
import network from '@lib/network'

import CircularProgress from '@material-ui/core/CircularProgress';

import * as userActions from '@store/modules/user';
import * as stopActions from '@store/modules/stop';

class GameInfoContainer extends Component {
  state = {oneClick: false}

  componentDidMount = async() => {
    Socket.addListener('onGameBetting', this.onGameBetting);
    Socket.addListener('onUpdateBalance', this.onUpdateBalance);
  }

  onUpdateBalance = async(msg) => {
    msg = JSON.parse(await decipher(msg));
    if(this.props.user.account !== msg.account) return;
    
    const current = this.props.user.balance;

    const { UserActions } = this.props;
    UserActions.setBalance(msg.balance);
    updateBalance(current, msg.balance, balance => UserActions.setBalance(balance));

    //this.props.onBalance(msg.balance);
    //updateBalance(current, msg.balance, balance => this.props.onBalance(balance));
  }

  onGameBetting = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));
    console.log('onGameBetting', msg);

    const { StopActions } = this.props;
    StopActions.setGameStopBettingList(msg.bettings);
    // this.props.onGameStopBettingList(msg.bettings);
  }

  onBet = async() => {
    this.oneClick = true;
    Socket.socket.emit('onGameBetting', await encryption({nick: this.props.user.nick, account: this.props.user.account, time: moment().utc().valueOf()}));
  }

  onStop = async() => {
    this.oneClick = true;
    Socket.socket.emit('onGameStop', await encryption({nick: this.props.user.nick, account: this.props.user.account, time: moment().utc().valueOf()}));
  }

  onDeposit = async() => {
    const result = await network('wallet', 'deposit', {account: this.props.user.account});
    console.log(result);
  }

  onWithdraw = async() => {
    // const result = await network('wallet', 'withdraw', {account: this.props.user.account, balance: 10000000000, address: '1GkeHLKzJLUS1ACpqmhC2uKt7LttGVKJCm'});
    // console.log(result);
  }

  isStop = () => {
    const item = this.props.stop.bettings.find(i => this.props.user.account === i.account);
    if(item === undefined) return true;
    return item.count === 0 ? true : false;
  }

  isReady = () => {
    if(this.props.stop.state !== 'ready') return true;
    const item = this.props.stop.bettings.find(i => this.props.user.account === i.account);
    return item === undefined ? false : true;
  }

  buttonState = () => {
    const item = this.props.stop.bettings.find(i => this.props.user.account === i.account);
    if(item.state === 'stop') return 'cancel (' + item.count + ')';
    return 'STOP';
  }

  numberWithCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  render() {

    console.log(this.props.user.userData);
    console.log(this.props.user);

    return (
      <Paper>
      
        <Typography>Game Info</Typography>                
        {this.props.user.userData === null || this.props.user === undefined || this.props.user.userData === 'no session'
        ?
          <div align ="center">
          <Typography>  need Login </Typography>
          <br></br>
          <CircularProgress color="secondary" thickness={7} />
         </div>
        
        : 
          <div>
            <Typography>my balance : {this.numberWithCommas(this.props.user.balance.toFixed(2))}</Typography>
            <Typography>players : {this.props.stop.bettings.length}</Typography>
            <Typography>deposit : {this.props.stop.bettings.length * config.game.stop.bettingValue}</Typography>
            {
              this.props.stop.state === 'ready' ? 
              <Button variant='outlined' onClick={this.onBet} disabled={this.onClick || this.isReady()}>Bet</Button> : 
              this.props.stop.state === 'start' ?
              <Button variant='outlined' onClick={this.onStop} disabled={this.onClick || this.isStop()}>{this.buttonState()}</Button> :
              ''
            }
            <Button variant='outlined' onClick={this.onDeposit}>deposit</Button>
            <Button variant='outlined' onClick={this.onWithdraw}>withdraw</Button>
          </div>
        }
        
      </Paper>
    )  
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user'),
    stop: state.stop.get('stop')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    StopActions: bindActionCreators(stopActions, dispatch)
  })
)(GameInfoContainer);