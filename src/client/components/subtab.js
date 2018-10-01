import React from 'react'
import { observer } from 'mobx-react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import DataManager from 'lib/dataManager'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
});

@observer class Subtab extends React.Component {
  onChange = (event, value) => DataManager.setSelectSub(value)

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
