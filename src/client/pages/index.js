import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'

import styles from "@styles/base.scss"
import classNames from 'classnames/bind'

import { setServerRenderClock } from '@store/modules/clock'
import * as clockActions from '@store/modules/clock'

import Examples from '@components/examples'
import 'babel-polyfill'

const cx = classNames.bind(styles);

class Index extends React.Component {

  static getInitialProps ({ reduxStore, req }) {
    console.log('Index getInitialProps');
    const isServer = !!req
    reduxStore.dispatch(setServerRenderClock(isServer))

    return {}
  }

  componentDidMount() {
    const { ClockActions } = this.props;
    ClockActions.initialize();

    this.timer = setInterval( () => {
      // Dispatch `TICK` every 1 second
      ClockActions.setStartClock({light: true, ts: Date.now()});
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {

    return (
      <div style={{background: 'linear-gradient(to right bottom, #A0A0A0, #D0D0D0)', minHeight: '100vh'}}>
        <Examples />
      </div>
    )  
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    ClockActions: bindActionCreators(clockActions, dispatch)
  })
)(Index);