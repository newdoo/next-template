import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import Cashout from '@common/cashout'
import Network from '@lib/network'

const styles = theme => ({
  root: {
    height: '100%',
    margin: theme.spacing.unit,
  },
  list: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  avatar: {
    margin: 0,
    width: 20,
    height: 20,
  },
  top: {
    color: '#87CEEB',
  },
  middle: {
    color: '#FFE05C',
  },
  bottom: {
    color: '#E9673C',
  },
});

class BettingInfo extends React.Component {
  cashout = index => Cashout.getCashOut(this.props.stop.bettings.length, index + 1)

  randomImage = () => {
    const list = ['http://health.chosun.com/site/data/img_dir/2016/07/01/2016070101161_0.jpg', 'https://t1.daumcdn.net/cfile/tistory/193AD54D4E4C9A0412', 'https://t1.daumcdn.net/cfile/tistory/19600C0F4AC07AE5EF'];

    const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    return list[randomRange(0, 2)];
  }

  onUserDetail = account => async() => {
    const msg = await Network('user', 'detail', {account, start: 0, count: 0});
    console.log(msg);
  }

  renderItem = (value, index) => {
    const result = this.cashout(index);

    return (
      <React.Fragment>
        <ListItemText classes={{primary: this.props.classes[result.type]}} primary={value.nick} />
        <ListItemText classes={{primary: this.props.classes[result.type]}} primary={value.distance.toFixed(2) + ' km'}/>
        <ListItemText classes={{primary: this.props.classes[result.type]}} primary={result.cashout + 'x / ' + result.profit}/>        
      </React.Fragment>
    )
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Bet List</Typography>
        <List className={classes.list}>
          { 
            this.props.stop.bettings.filter(value => value.state === 'stop').sort((a, b) => a.distance > b.distance ? -1 : 1).map((value, index) => (
              <ListItem dense button key={value.id} onClick={this.onUserDetail(value.account)}>
                <Avatar className={classes.avatar} src={this.randomImage()}></Avatar>
                {this.renderItem(value, index)}
              </ListItem>
            ))
          }
          { 
            this.props.stop.bettings.filter(value => value.state === 'betting').map(value => (
              <ListItem dense button key={value.id} onClick={this.onUserDetail(value.account)}>
                <Avatar className={classes.avatar} src={this.randomImage()}></Avatar> 
                <ListItemText primary={value.nick}/>
              </ListItem>
            ))
          }
        </List>
      </Paper>
    )  
  }
}

BettingInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {return {stop: state.stop}}
export default withStyles(styles)(connect(mapStateToProps, null)(BettingInfo));