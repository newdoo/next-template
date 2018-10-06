import React from 'react'
import io from 'socket.io-client'
import moment from 'moment'
import { connect } from 'react-redux'

import config from '@common/config.json'

import Chatting from '@components/bustabit/Chatting'

class ChattingContainer extends React.Component {
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

    return (
      <Chatting
        chattingList={this.state.chattingList}
        disabled={this.props.user.nick === '' ? true : false}
        onKeyPress={this.onSendMessage}
      />
    )  
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user'),
  }),
  (dispatch) => ({
  })
)(ChattingContainer);

