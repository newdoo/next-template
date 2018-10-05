import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import { bindActionCreators } from 'redux';

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Register from '@components/register'
import { encryption, decipher } from '@lib/crypto'
import config from '@common/config.json'
import Socket from '@lib/socket'
import updateBalance from '@lib/updateBalance'

import * as userActions from '@store/modules/user';
import * as stopActions from '@store/modules/stop';

class GameInfoContainer extends Component {

  state = {oneClick: false}

  componentDidMount = async() => {
    console.log('ccc');
    Socket.addListener('onGameBetting', this.onGameBetting);
    Socket.addListener('onUpdateBalance', this.onUpdateBalance);
  }

  onUpdateBalance = async(msg) => {
    console.log('aaa');
    msg = JSON.parse(await decipher(msg));
    if(this.props.user.account !== msg.account) return;
    
    const current = this.props.user.balance;

    const { UserActions } = this.props;
    UserActions.setBalance(msg.balance);
    //this.props.onBalance(msg.balance);
    updateBalance(current, msg.balance, balance => UserActions.setBalance(balance));
  }

  onGameBetting = async(msg) => {
    console.log('bbb');
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));
    console.log('onGameBetting', msg);

    const { StopActions } = this.props;
    StopActions.setGameStopBettingList(msg.bettings);
    //this.props.onGameStopBettingList(msg.bettings);
  }

  onBet = async() => {
    this.oneClick = true;
    Socket.socket.emit('onGameBetting', await encryption({nick: this.props.user.nick, account: this.props.user.account, time: moment().utc().valueOf()}));
  }

  onStop = async() => {
    this.oneClick = true;
    Socket.socket.emit('onGameStop', await encryption({nick: this.props.user.nick, account: this.props.user.account, time: moment().utc().valueOf()}));
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

    console.log(this.props.user.balance);
    console.log(this.props.user.nick);

    return (
      <Paper>
        <Typography>Game Info</Typography>
        {this.props.user.nick === undefined ? <Register/> : 
          <div>
            <Typography>my balance : {this.numberWithCommas(this.props.user.balance)}</Typography>
            <Typography>players : {this.props.stop.bettings.length}</Typography>
            <Typography>deposit : {this.props.stop.bettings.length * config.game.stop.bettingValue}</Typography>

            {
              this.props.stop.state === 'ready' ? 
              <Button variant='outlined' onClick={this.onBet} disabled={this.onClick || this.isReady()}>Bet</Button> : 
              this.props.stop.state === 'start' ?
              <Button variant='outlined' onClick={this.onStop} disabled={this.onClick || this.isStop()}>{this.buttonState()}</Button> :
              ''
            }
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


/*
GameInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {return {user: state.user, stop: state.stop}}

const mapDispatchToProps = (dispatch) => {
  return {
    onBalance: balance => dispatch(setBalance(balance)),
    onGameStopBettingList: bettings => dispatch(setGameStopBettingList(bettings)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GameInfo));
*/