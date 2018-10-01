import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import DataManager from '../lib/dataManager'
import { userCreate, userLogin } from '../lib/user'

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

@observer class Register extends React.Component {
  @observable inputNick = '';

  onCreate = async() => {
    const recv = await userCreate(this.inputNick, '1234');
    DataManager.setNick(recv.nick);
  }

  onLogin = async() => {
    const recv = await userLogin(this.inputNick, '1234'); 
    DataManager.setNick(recv.nick);
  }

  onInputNick = async(event) => this.inputNick = event.target.value;

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Typography color='secondary'>{'Login & Register'}</Typography>
        <TextField id='name' label='Name' className={classes.textField} onChange={this.onInputNick} margin="normal"/>
        <Button className={classes.button} disabled={this.inputNick === '' ? true : false} onClick={this.onCreate}>Create</Button>
        <Button className={classes.button} disabled={this.inputNick === '' ? true : false} onClick={this.onLogin}>Login</Button>
      </div>
    )  
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
