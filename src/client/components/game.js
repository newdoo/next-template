import io from 'socket.io-client'
import moment from 'moment'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import config from '../../common/config.json'
import { encryption, decipher } from '../lib/crypto'

const styles = theme => ({
});

class Game extends React.Component {
  state = {remainTime: '0.0', serverState: '' };
  history = [];

  componentDidMount = async() => {
    this.socket = io(config[process.env.NODE_ENV].inGameURL);
    this.socket.on('onGameMessage', this.onGameMessage);
  }

  onGameMessage = async(msg) => {
    msg = JSON.parse(await decipher(msg));
    console.log(msg);

    this.setState({ serverState: msg.state });

    if(msg.state === 'ready') {
      this.countDown(msg.time);
    } else if(msg.state === 'start') {
      this.history = this.history.concat(msg);
    }
  }

  countDown = time => {
    const interval = setInterval(() => {
      const remain = ((time - moment().utc().format('x')) / 1000).toFixed(1);
      this.setState({ remainTime: remain <= 0 ? '0.0' : remain });
      
      if(remain < 0) {
        this.setState({ remainTime: '0.0' });
        clearInterval(interval);
      }
    }, 100);
  }

  reqeustHistory = async() => {
    this.socket.on('onHistoryMessage', async(msg) => {
      this.socket.removeAllListeners('onHistoryMessage');

      msg = JSON.parse(await decipher(msg));
      console.log(msg);
    });

    this.socket.emit('onHistoryMessage', await encryption({ start: 10, count: 10 }));
    //console.log(this.history);
  }

  ready = () => {
    const {isMobile} = this.props;

    return (
        <Typography variant={isMobile ? 'display1' : 'display4'}>
            {this.state.remainTime} sec
        </Typography>      
    )
  }

  start = () => {
    const {isMobile} = this.props;

    return (
        <Typography variant={isMobile ? 'display1' : 'display4'}>
            start
        </Typography>
    )
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        {this.state.serverState === 'ready' ? this.ready() : this.start()}
        <Button onClick={this.reqeustHistory}>list</Button>
      </div>
    )  
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
