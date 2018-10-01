import io from 'socket.io-client'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import config from '../../common/config.json'

const styles = theme => ({
});

class InGame extends Scene {
  state = { fadeInOut: false, isStart: false, remainTime: '0.0', serverState: '' };

  componentDidMount = async() => {
    super.componentDidMount();
    this.setState({ fadeInOut: true });
    
    this.socket = io(config.inGameURL);
    this.socket.on('onConnection', recv => this.connected = recv.type === 'connected' ? true : false);
    this.socket.on('onGameMessage', this.onGameMessage);
  }

  onGameMessage = msg => {
    console.log(msg);

    this.setState({ serverState: msg.state });

    if(msg.state === 'ready') {
      this.updateReady(msg.time);
    }
  }

  updateReady = time => {
    const interval = setInterval(() => {
      const remain = ((time - moment().utc().valueOf()) / 1000).toFixed(1);
      this.setState({ remainTime: remain <= 0 ? '0.0' : remain });
      
      if(remain < 0) {
        this.setState({ remainTime: '0.0' });
        clearInterval(interval);
      }
    }, 100);
  }

  render() {
    const { classes } = this.props;

    return (
      <App>
        <Fade in={ this.state.fadeInOut }>
          <Typography variant={ this.state.isMobile ? 'display1' : 'display4' }>
            { this.state.remainTime } sec
          </Typography>

          {/* { this.state.serverState === 'ready' ?
            <Typography>{ this.state.remainTime }</Typography> : ''
          } */}
        </Fade>
      </App>
    )  
  }
}

InGame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InGame);
