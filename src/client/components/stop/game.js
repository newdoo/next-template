import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'
import Fade from '@material-ui/core/Fade'

import config from 'common/config.json'
import { encryption, decipher } from 'lib/crypto'
import { setGameStopBettingList, setGameStopState, } from 'src/client/actions'
import Socket from 'lib/socket'
const easing = require('common/easing')

const sleep = ms => new Promise(res => setTimeout(res, ms))

const styles = theme => ({
  root: {
    height: 250,
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  font: {
    marginRight: 10,
    fontFamily: 'PT Sans'
  }
});

class Game extends React.Component {  
  state = {remainTime: 0, resultBust: 0, bust: 0}
  interval = null;

  componentDidMount = async() => {
    Socket.connect(config[process.env.NODE_ENV].gameStopURL);
    Socket.addListener('onGameInfo', this.onGameInfo);
  }

  onGameInfo = async(msg) => {
    if(this.props.user.accountID !== '')
      Socket.socket.emit('onPing', await encryption({accountID: this.props.user.accountID, time: moment().utc().valueOf()}));

    msg = JSON.parse(await decipher(msg));
    this.props.onGameStopState(msg.state);

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
    const {classes} = this.props;

    return (
      <CircularProgress className={classes.progress}/>
    )
  }

  ready = () => {
    const {isMobile, classes} = this.props;

    return (
      <Typography className={classes.font} variant={isMobile ? 'display1' : 'display4'} align='right'>
        {this.state.remainTime.toFixed(1)} sec
      </Typography>
    )
  }

  start = () => {
    const {isMobile, classes} = this.props;

    return (
      <Fade in={true}>
        <div>
          <Typography className={classes.font} variant={isMobile ? 'display1' : 'display4'} align='right'>
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
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        {this.props.stop.state === 'none' ? this.none() : this.props.stop.state === 'ready' ? this.ready() : this.props.stop.state === 'start' ? this.start() : this.props.stop.state == 'bust' ? this.bust() : '' }
      </Paper>
    )  
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {return {user: state.user, stop: state.stop}}

const mapDispatchToProps = (dispatch) => {
  return {
    onGameStopState: state => dispatch(setGameStopState(state)),
    onGameStopBettingList: bettings => dispatch(setGameStopBettingList(bettings)), 
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Game));