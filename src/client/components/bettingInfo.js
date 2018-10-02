import React from 'react'
import { observer } from 'mobx-react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import DataManager from 'lib/dataManager'


const styles = theme => ({
  root: {
    height: '100%',
    margin: theme.spacing.unit,
  },
  list: {
    width: '100%',
    height: '100%',
    margin: theme.spacing.unit,
    overflow: 'auto'
  },
  avatar: {
    margin: 0,
  },
  top: {
    color: '#87CEEB',
  },
  middle: {
    color: '#FFE05C',
  },
  bottom: {
    color: '#E9673C',
  }
});

@observer class BettingInfo extends React.Component {
  ranking = index => {
    index += 1;

    const total = DataManager.bettingList.length;
    const top = Math.ceil(total * 0.2);
    const middle = Math.ceil(total * 0.4);

    if(index <= top) return this.props.classes.top;
    if(index <= top + middle) return this.props.classes.middle;
    return this.props.classes.bottom;
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Bet List</Typography>
        <List className={classes.list}>
          { 
            DataManager.bettingList.filter(value => value.state === 'stop').sort((a, b) => a.distance > b.distance ? -1 : 1).map((value, index) => { 
              return (
                <ListItem key={value.nick} dense>
                  <Avatar className={classes.avatar}>{value.nick[0]}</Avatar>
                  <ListItemText classes={{primary: this.ranking(index)}} primary={value.nick} secondary={value.distance.toFixed(2) + ' km'}/>
                </ListItem>
              )
            })
          }
          { 
            DataManager.bettingList.filter(value => value.state === 'betting').map(value => { 
              return (
                <ListItem key={value.nick}>
                  <Avatar className={classes.avatar}>{value.nick[0]}</Avatar> 
                  <ListItemText primary={value.nick}/>
                </ListItem>
              )
            })
          }
        </List>
      </Paper>
    )  
  }
}

BettingInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BettingInfo);
