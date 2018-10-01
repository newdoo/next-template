import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import DataManager from 'lib/dataManager'
import SubTab from 'components/subtab'
import Chatting from 'components/chatting'
import HistoryList from 'components/historyList'

const styles = theme => ({
  root: {
    height: '100%',
    margin: theme.spacing.unit,
  },
});

@observer class Contents extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <SubTab/>
        {DataManager.selectSub === 0 ? <Chatting/> : <HistoryList/>}
      </Paper>
    )  
  }
}

Contents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contents);
