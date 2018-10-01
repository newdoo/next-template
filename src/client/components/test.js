import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ActionCreator from '../actions'
import getWeb3 from '../lib/getWeb3'

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
    const web3 = await getWeb3;
    console.log(await web3.eth.getCoinbase());
  }

  onExchange = async() => {
    //await web3.eth.sendTransaction({from: web3.eth.coinbase, to: '0x8ac109ebf85779e4c2495dD8f64d2dABB0473498', value: web3.utils.toWei('1', 'ether')});
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button variant='outlined' onClick={this.onExchange}>GET</Button>
        <Typography>BIT : {this.props.balance.bit}</Typography>
        <Typography>ETH : {this.props.balance.eth}</Typography>

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
