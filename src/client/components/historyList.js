import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    height: 448,
    margin: theme.spacing.unit,
  },
});

@observer class HistoryList extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Typography>History List</Typography>
      </div>
    )  
  }
}

HistoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryList);
