import React from 'react'
import { observer } from 'mobx-react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { encryption, decipher } from '../lib/crypto'
import DataManager from 'lib/dataManager'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
});

@observer class Subtab extends React.Component {
  onChange = async(event, value) => {
    if(value === 1) await this.reqeustHistory();

    DataManager.setSelectSub(value);
  }

  reqeustHistory = async() => {
    DataManager.socket.on('onGameHistory', async(msg) => {
      DataManager.socket.removeAllListeners('onGameHistory');

      msg = JSON.parse(await decipher(msg));

      console.log('onGameHistory', msg);

      DataManager.historys.clear();
      DataManager.setHistory(msg);
    });

    DataManager.socket.emit('onGameHistory', await encryption({start: 10, count: 10}));
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Tabs value={DataManager.selectSub} onChange={this.onChange} indicatorColor="primary" textColor="primary" fullWidth>
          <Tab label='Chatting'/>
          <Tab label='History'/>
        </Tabs>
      </div>
    )  
  }
}

Subtab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Subtab);
