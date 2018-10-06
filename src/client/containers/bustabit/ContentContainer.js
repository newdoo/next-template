import React from 'react'

import Paper from '@material-ui/core/Paper'

import Network from '@lib/network'

import ChattingContainer from '@containers/bustabit/ChattingContainer';

import History from '@components/bustabit/History';
import Subtab from '@components/bustabit/Subtab';

class Contents extends React.Component {
  state = {select: 0, history: null};
 
  onChange = async(event, value) => {
    if(value === 1) await this.reqeustHistory();
    this.setState({select: value});
  }

  reqeustHistory = async() => {
    const msg = await Network('history', 'list', {kind: 'game.stop', start: 0, count: 100});
    
    if(msg.result === 'ok') {
      this.setState({history: msg.history});
    }
  }

  render() {

    return (
      <Paper>
        <Subtab select={this.state.select} onChange={this.onChange} />
        {this.state.select === 0 ? <ChattingContainer/> : <History history={this.state.history}/>}
      </Paper>
    )  
  }
}

export default Contents;