import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ActionCreator from '../actions'

const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

class Test extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount = async() => {
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button onClick={() => this.props.updateBalance(1)}>UP</Button>
        <Button onClick={() => this.props.setBalance(1)}>SET</Button>
        <Typography>{this.props.balance}</Typography>
      </div>
    )  
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {return { balance: state.balance }}

const mapDispatchToProps = dispatch => {
  return {
    updateBalance: (balance) => dispatch(ActionCreator.updateBalance(balance)),
    setBalance: (balance) => dispatch(ActionCreator.setBalance(balance))
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Test));
