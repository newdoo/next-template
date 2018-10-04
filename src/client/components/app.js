import React from 'react'
import moment from 'moment'
import { createStore } from 'redux'
import { Provider  } from 'react-redux'

import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'

import withRoot from '@lib/withRoot'
import reducers from '../reducers'

import configure from '@store/configure'

let store = null;
if(process.browser) {
  store = configure();
}

class App extends React.Component {
  state = {loading : false};
  
  componentDidMount() {
    moment.locale(navigator.language);
    this.setState({loading: true});
  }

  render() {

    return this.state.loading === false ? '' : 
    (
      <Provider store = {store}>
        <div style={{background: 'linear-gradient(to right bottom, #A0A0A0, #D0D0D0)', minHeight: '100vh'}}>
          <main>
            <div>
              {this.props.children}
            </div>
          </main>
        </div>
      </Provider>
    )
  }
}

export default withRoot(App);