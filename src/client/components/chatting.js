import React from 'react'
import io from 'socket.io-client'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'

import { encryption, decipher } from '../lib/crypto'
import config from '../../common/config.json'
import DataManager from '../lib/dataManager'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
    width: '98%'
  },
  root: {
    width: '100%',
    height: 400,
    backgroundColor: '#F0F0F0',
    overflow: 'auto'
  },
  avatar: {
    margin: 0,
    width: 20,
    height: 20,
  },
  item: {
    color: '#E9673C',
  }
});

@observer class Chatting extends React.Component {
  @observable map = new Map();

  @action add = msg => this.map.set(msg.id, msg)
  @computed get message() {return Array.from(this.map.values())}

  componentDidMount = async() => {
    this.socket = io(config[process.env.NODE_ENV].chattingURL);
    this.socket.on('onChattingMessage', this.onChattingMessage);
    this.socket.on('onChannel', {channel: navigator.language});
  }

  onChattingMessage = async(msg) => {
    msg = JSON.parse(await decipher(msg));
    this.add({id: this.message.length, ...msg});
  }

  onSendMessage = async(event) => {
    if(event.charCode === 13) {
      const message = event.target.value;

      if(message === '') return;
      event.target.value = '';

      this.socket.emit('onChattingMessage', await encryption({channel: navigator.language, nick: DataManager.nick(), message}));
      this.add({id: this.message.length, nick: DataManager.nick(), message});
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <List className={classes.root}>
        {
          this.message.map(value => {
              return (
                <ListItem dense key={value.id}>
                  <ListItemText primary={value.nick + ' : ' + value.message}/>
                </ListItem>
              )
            })
          }
        </List>
        <Input className={classes.input} disabled={DataManager.nick() === '' ? true : false}placeholder='enter message' inputProps={{'aria-label': 'Description'}} onKeyPress={this.onSendMessage}/>
      </React.Fragment>
    )  
  }
}

Chatting.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chatting);
