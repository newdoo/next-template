import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
});

class Subtab extends React.Component {
  render() {
    const {classes, select, onChange} = this.props;

    return (
      <div className={classes.root}>
        <Tabs value={select} onChange={onChange} indicatorColor='primary' textColor='primary' fullWidth>
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