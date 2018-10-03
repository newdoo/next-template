import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { userCreate, userLogin } from '@lib/user'
import { setUserData, setBalance } from '../actions'
import updateBalance from '@lib/updateBalance'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Register extends React.Component {
  state = {inputNick: ''};

  checkNick = text => text.toString().replace(/[^a-z0-9]/, '')

  invalidNick = () => {
    if(this.state.inputNick.length <= 3) return true;
    if(this.state.inputNick.length >= 12) return true;
    return false;
  }

  onCreate = async() => {
    const recv = await userCreate(this.state.inputNick, this.state.inputNick, '1234');
    console.log(recv);

    if(recv.result !== 'ok') return;
    this.props.onUserData({nick: recv.nick, balance: Number(recv.balance), account: recv.account, uuid: recv.uuid});
    updateBalance(0, recv.balance, balance => this.props.onBalance(balance));
  }

  onLogin = async() => {
    const recv = await userLogin(this.state.inputNick, '1234'); 
    console.log(recv);

    if(recv.result !== 'ok') return;
    this.props.onUserData({nick: recv.nick, balance: Number(recv.balance), account: recv.account, uuid: recv.uuid});
    updateBalance(0, recv.balance, balance => this.props.onBalance(balance));
  }

  onInputNick = async(event) => {
    event.target.value = this.checkNick(event.target.value)
    this.setState({inputNick: event.target.value});
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Typography color='secondary'>{'Login & Register'}</Typography>
        <TextField id='name' label='Name' className={classes.textField} onChange={this.onInputNick} margin="normal"/>
        <Button className={classes.button} disabled={this.invalidNick()} onClick={this.onCreate}>Create</Button>
        <Button className={classes.button} disabled={this.invalidNick()} onClick={this.onLogin}>Login</Button>
      </div>
    )  
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserData: user => dispatch(setUserData(user)),
    onBalance: balance => dispatch(setBalance(balance)),
  }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(Register));