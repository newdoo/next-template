import io from 'socket.io-client'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import Test from 'components/test'
import Test_Seed from 'components/test_seed'
import config from '../../common/config.json'

const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

class Index extends Scene {
  state = {fadeInOut: false, socket: null};

  componentDidMount = async() => {
    super.componentDidMount();
    this.setState({ fadeInOut: true });

    this.socket = io(config.chatting_server + ':' + config.chatting_port);
    this.socket.emit('join', {room: 1});

    this.socket.on('message', data => {console.log(data)});
  }

  onSendMessage = () => {
    this.socket.emit('chatting', {room: 1, message: '123'});
  }

  render() {
    const {classes} = this.props;

    return (
      <App>
        <Fade in={this.state.fadeInOut}>
          <Typography variant={this.state.isMobile ? 'display1' : 'display4'}>

            Next-Template
          </Typography>
        </Fade>

        <div className={classes.menu}>
          <Test/>
          <Test_Seed/>
          <Button onClick={this.onSendMessage}>Send</Button>
        </div>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
