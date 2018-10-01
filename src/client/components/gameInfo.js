import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Register from 'components/register'
import DataManager from 'lib/dataManager'
import { encryption, decipher } from '../lib/crypto'


const styles = theme => ({
  root: {
    height: 250,
    margin: theme.spacing.unit,
  },
  content: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


@observer class GameInfo extends React.Component {
  @observable bettingButtonEnable = true;
  @observable oneClick = false;

  componentDidMount = async() => {
    DataManager.socket.on('onGameBetting', this.onGameBetting);
    DataManager.socket.on('onGameStop', this.onGameStop);
  }

  onGameBetting = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));

    console.log('onGameBetting', msg);

    if(msg.nick === DataManager.nick)
      DataManager.setBetting(true);

    DataManager.bettingList = DataManager.bettingList.concat(msg);
  }

  onGameStop = async(msg) => {
    this.oneClick = false;
    msg = JSON.parse(await decipher(msg));

    console.log('onGameStop', msg);

    if(msg.nick === DataManager.nick)
      DataManager.setBetting(false);

    DataManager.stopList = DataManager.stopList.concat(msg);
  }

  onBet = async() => {
    if(DataManager.nick === '') return;
    this.oneClick = true;
    DataManager.socket.emit('onGameBetting', await encryption({nick: DataManager.nick}));
  }

  onStop = async() => {
    if(DataManager.isBetting === false) return;
    this.oneClick = true;
    DataManager.socket.emit('onGameStop', await encryption({nick: DataManager.nick}));
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography>Game Info</Typography>
        {DataManager.nick === '' ? <Register/> : 
          <div className={classes.content}>
            <Typography>Total : {DataManager.bettingList.length}</Typography>
            <Typography>Bet : {DataManager.bettingList.length * 100} bet</Typography>

            {
              DataManager.state === 'ready' ? 
              <Button className={classes.button} variant='outlined' onClick={this.onBet} disabled={this.onClick || DataManager.isBetting}>Bet</Button> : 
              DataManager.state === 'start' ?
              <Button className={classes.button} variant='outlined' onClick={this.onStop} disabled={this.onClick || !DataManager.isBetting}>Stop</Button> :
              ''
            }
          </div>
        }
      </Paper>
    )  
  }
}

GameInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameInfo);
