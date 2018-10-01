import React from 'react'
import io from 'socket.io-client'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'

import { encryption, decipher } from '../lib/crypto'
import config from '../../common/config.json'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
  chattingList: {
    width: '100%',
    height: 300,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

class Chatting extends React.Component {
  state = {message: []};

  componentDidMount = async() => {
    this.socket = io(config[process.env.NODE_ENV].chattingURL);
    this.socket.on('onChattingMessage', this.onChattingMessage);
    this.socket.on('onChannel', {channel: navigator.language});
  }

  onChattingMessage = async(msg) => {
    msg = JSON.parse(await decipher(msg));
    this.setState({message: this.state.message.concat(msg)});
  }

  onSendMessage = async(event) => {
    if(event.charCode === 13) {
      const message = event.target.value;

      if(message === '') return;
      event.target.value = '';

      this.socket.emit('onChattingMessage', await encryption({channel: navigator.language, nick: 'no', message}));
      this.setState({message: this.state.message.concat({nick: 'no', message})});
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.chattingList}>
          <List>
            {this.state.message.map(value => { console.log(value);
              <ListItem key={value} dense>
                <Avatar alt='Remy Sharp' src='/static/images/remy.jpg' />
                <ListItemText primary={value.nick + ' : ' + value.message}/>
              </ListItem>
            })}
          </List>
        </div>
        <Input className={classes.input} placeholder='enter message' inputProps={{'aria-label': 'Description'}} onKeyPress={this.onSendMessage}/>
       </div>
    )  
  }
}

Chatting.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chatting);
