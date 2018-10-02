import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import DataManager from 'lib/dataManager'

const styles = theme => ({
  root: {
    height: 448,
    width: '100%',
    backgroundColor: '#F0F0F0',
    overflow: 'auto'
  }
});

@observer class HistoryList extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <List className={classes.root}>
      {
        DataManager.historyList.map(value => { 
          return (
            <ListItem dense button key={value.seed}>
              <ListItemText primary={'Bust : ' + value.number + ' - ' + moment(value.time).format('LLL')} secondary={value.seed}/>
            </ListItem>              
          )
        })
      }
    </List>
    )  
  }
}

HistoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryList);
