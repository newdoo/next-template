import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ActionCreator from '../actions'
import { userCreate, userInfo, userLogin } from '../lib/user'


const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

class TestSeed extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = async() => {
  }

  onCreate = async() => {
    const recv = await userCreate('doo8866', '1234');
    console.log(recv);
  }

  onLogin = async() => {
    const recv = await userLogin('doo8866', '1234');
    this.props.setUUID(recv.uuid);
    this.props.setNick(recv.nick);
    console.log(recv);
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button onClick={this.onCreate}>Create</Button>
        <Button onClick={this.onLogin}>Login</Button>
        <Typography>{this.props.user.nick}</Typography>
        <Typography>{this.props.user.uuid}</Typography>

      </div>
    )  
  }
}

TestSeed.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {return { user: state.user }}

const mapDispatchToProps = dispatch => {
  return {
    setUUID: uuid => dispatch(ActionCreator.setUUID(uuid)),
    setNick: nick => dispatch(ActionCreator.setNick(nick)),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TestSeed));
