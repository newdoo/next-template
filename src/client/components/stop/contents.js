import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Network from 'lib/network'
import SubTab from 'components/stop/subtab'
import Chatting from 'components/chatting'
import History from 'components/stop/history'

const styles = theme => ({
  root: {
    height: '100%',
    margin: theme.spacing.unit,
  },
});

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
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <SubTab select={this.state.select} onChange={this.onChange} />
        {this.state.select === 0 ? <Chatting/> : <History history={this.state.history}/>}
      </Paper>
    )  
  }
}

Contents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contents);