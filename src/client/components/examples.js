import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Clock from './clock'
//import Counter from './counter'

import * as clockActions from '@store/modules/clock'

class Examples extends Component {

  render() {

    const {lastUpdate, light} = this.props;

    return (
      <div>
        <Clock lastUpdate={lastUpdate} light={light} />
        { /* <Counter /> */ }
      </div>
    );
  }
}


export default connect(
  (state) => ({
    lastUpdate: state.clock.get('lastUpdate'),
    light: state.clock.get('light')
  }),
  (dispatch) => ({
    ClockActions: bindActionCreators(clockActions, dispatch)
  })
)(Examples);