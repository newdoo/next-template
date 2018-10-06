import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'
import Fade from '@material-ui/core/Fade'

import config from '@common/config.json'
import { encryption, decipher } from '@lib/crypto'
import Socket from '@lib/socket'
const easing = require('@common/easing')

import * as userActions from '@store/modules/user';
import * as stopActions from '@store/modules/stop';

import Ready from '@components/bustabit/Ready';

const sleep = ms => new Promise(res => setTimeout(res, ms))

class GameContainer extends Component {  

  state = {remainTime: 0, resultBust: 0, bust: 0}
  interval = null;

  componentDidMount = async() => {
    Socket.connect(config[process.env.NODE_ENV].gameStopURL);
    Socket.addListener('onGameInfo', this.onGameInfo);

    //const { UserActions } = this.props;
    //UserActions.setUserData({nick: 'no'});
  }

  onGameInfo = async(msg) => {
    if(this.props.user.accountID !== '')
      Socket.socket.emit('onPing', await encryption({accountID: this.props.user.accountID, time: moment().utc().valueOf()}));

    msg = JSON.parse(await decipher(msg));

    console.log(msg.state);
    const { StopActions } = this.props;
    StopActions.setGameStopState(msg.state);
    //this.props.onGameStopState(msg.state);

    if(msg.state === 'ready') {
      this.onReady(msg);
    } else if(msg.state === 'start') {
      this.onStart(msg);
    } else if(msg.state === 'bust') {
      await this.onBust(msg);
    }
  }

  onReady = msg => {
    this.stopTime();

    this.interval = setInterval(() => {
      const now = moment().utc();
      const remain = (5 - (now.diff(moment(msg.time)) / 1000));
      this.setState({remainTime: remain <= 0 ? 0 : remain});
      
      if(remain < 0) {
        this.setState({remainTime: 0});
        this.stopTime();
      }
    }, 100);
  }

  onStart = msg => {
    let bust = 0;
    this.stopTime();

    this.interval = setInterval(() => {
      const now = moment().utc();
      bust = easing.easeInSine(now.diff(moment(msg.time)), 0, config.game.stop.bustMaxValue, config.game.stop.bustMaxTime);
      this.setState({bust: bust.toFixed(2)});
    }, 10);
  }

  onBust = async(msg) => {
    this.stopTime();
    this.setState({resultBust: msg.number.toFixed(2)});

    await sleep(3000);
    this.props.onGameStopBettingList([]);
  }

  stopTime = () => {
    if(this.interval === null) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  none = () => {

    return (
      <CircularProgress />
    )
  }

  ready = () => {
    const {isMobile} = this.props;

    return (
      <Ready
        isMobile={isMobile}
        remainTime={this.state.remainTime}
      />
    )
  }

  start = () => {
    const {isMobile} = this.props;

    return (
      <Fade in={true}>
        <div>
          <Typography variant={isMobile ? 'display1' : 'display4'} align='right'>
            {this.state.bust} km
          </Typography> 
        </div>
      </Fade>
    )
  }

  bust = () => {
    const {isMobile} = this.props;

    return (
      <Zoom in={true}>
        <div>
          <Typography variant={isMobile ? 'display1' : 'display4'}>
            bust
          </Typography>
          <Typography variant='title' color='secondary'>
            {this.state.resultBust} km
          </Typography>
        </div>
      </Zoom>
    )    
  }

  render() {

    const { stop } = this.props;

    return (
      <Paper>
        {
          stop.get('state') === 'none' ? this.none() : 
          stop.get('state') === 'ready' ? this.ready() : 
          stop.get('state') === 'start' ? this.start() : 
          stop.get('state') == 'bust' ? this.bust() : '' 
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
)(GameContainer);