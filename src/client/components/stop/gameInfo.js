import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Register from 'components/register'
import { encryption, decipher } from 'lib/crypto'
import config from 'common/config.json'
import Socket from 'lib/socket'
import { setBalance, setGameStopBettingList } from '../../actions'
import updateBalance from 'lib/updateBalance'

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

class GameInfo extends React.Component {
  state = {oneClick: false}

  componentDidMount = async() => {
    Socket.addListener('onGameBetting', this.onGameBetting);
    Socket.addListener('onUpdateBalance', this.onUpdateBalance);
  }

  onUpdateBalance = async(msg) => {
    msg = JSON.parse(await decipher(msg));
    if(this.props.user.account !== msg.account) return;
    
    const current = this.props.user.balance;
    this.props.onBalance(msg.balance);
    updateBalance(current, msg.balance, balance => this.props.onBalance(balance));
  }

  onGameBetting = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));
    console.log('onGameBetting', msg);
    this.props.onGameStopBettingList(msg.bettings);
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
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Game Info</Typography>
        {this.props.user.nick === '' ? <Register/> : 
          <div className={classes.content}>
            <Typography>my balance : {this.numberWithCommas(this.props.user.balance)}</Typography>
            <Typography>players : {this.props.stop.bettings.length}</Typography>
            <Typography>deposit : {this.props.stop.bettings.length * config.game.stop.bettingValue}</Typography>

            {
              this.props.stop.state === 'ready' ? 
              <Button className={classes.button} variant='outlined' onClick={this.onBet} disabled={this.onClick || this.isReady()}>Bet</Button> : 
              this.props.stop.state === 'start' ?
              <Button className={classes.button} variant='outlined' onClick={this.onStop} disabled={this.onClick || this.isStop()}>{this.buttonState()}</Button> :
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

const mapStateToProps = (state) => {return {user: state.user, stop: state.stop}}

const mapDispatchToProps = (dispatch) => {
  return {
    onBalance: balance => dispatch(setBalance(balance)),
    onGameStopBettingList: bettings => dispatch(setGameStopBettingList(bettings)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GameInfo));