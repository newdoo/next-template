import React from 'react'
import io from 'socket.io-client'
import moment from 'moment'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import config from '@common/config.json'

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
  item: {
    marginLeft: 10,
    width: '98%',
    '.ul': {
        transform: 'rotate("180deg")'
      },
      'ul > li': {
        transform: 'rotate("-180deg")'
    }
  },
});

class Chatting extends React.Component {
  state = {chattingList: []}

  componentDidMount = async() => {
    this.socket = io(config[process.env.NODE_ENV].chattingURL);
    this.socket.on('onChattingMessage', this.onChattingMessage);
    this.socket.on('onList', this.onList)
    this.socket.emit('onChannel', {channel: 1});
  }

  onList = msg => {
    msg = msg.map(v => JSON.parse(v));
    this.setState({chattingList: msg.map(v => {return {id: v.date, ...v}})});
    this.socket.removeAllListeners('onList');
  }

  onChattingMessage = async(msg) => {
    this.setState({chattingList: this.state.chattingList.concat({id: msg.date, ...msg})});
  }

  onSendMessage = async(event) => {
    if(event.charCode === 13) {
      const message = event.target.value;

      if(message === '') return;
      event.target.value = '';

      const temp = {channel: 1, nick: this.props.user.nick, date: moment().valueOf(), message}
      this.socket.emit('onChattingMessage', temp);
      this.onChattingMessage(temp);
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <List className={classes.root}>
          {
            this.state.chattingList.map(value => (
                <Typography key={value.id} align='left' className={classes.item}>{value.nick + ' : ' + value.message}</Typography>
            ))
          }
        </List>
        <Input className={classes.input} disabled={this.props.user.nick === '' ? true : false} placeholder='enter message' inputProps={{'aria-label': 'Description'}} onKeyPress={this.onSendMessage}/>
      </div>
    )  
  }
}

Chatting.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {return {user: state.user}}
export default withStyles(styles)(connect(mapStateToProps, null)(Chatting));