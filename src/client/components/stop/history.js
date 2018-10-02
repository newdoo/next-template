import React from 'react'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'

import Network from 'lib/network'
import HistoryPopup from 'components/stop/history.popup'

const styles = theme => ({
  root: {
    height: 448,
    width: '100%',
    backgroundColor: '#F0F0F0',
    overflow: 'auto'
  }
});

class History extends React.Component {
  state = {popup: false, detial: null}

  onDetail = value => async() => {
    console.log(value);
    this.setState({popup: true, detial: value});
  }

  render() {
    const {classes, history} = this.props;

    return ( 
      history === null ? <CircularProgress/> : 
      <React.Fragment>
        <List className={classes.root}>
          {
            history.map(value => (
              <ListItem dense button key={value.seed} onClick={this.onDetail(value)}>
                <ListItemText primary={'Bust : ' + value.number.toFixed(1) + ' - ' + moment(value.time).format('LLL')} secondary={'seed : ' + value.seed}/>
              </ListItem>              
            ))
          }
        </List>
        <HistoryPopup open={this.state.popup} detail={this.state.detial} onClose={() => this.setState({popup: false})}/>
      </React.Fragment>
    )  
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(History);