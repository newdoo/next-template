import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    height: '100%',
    margin: theme.spacing.unit,
  },
});

@observer class BettingInfo extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Bet List</Typography>
      </Paper>
    )  
  }
}

BettingInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BettingInfo);
