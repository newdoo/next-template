import React from 'react'
import moment from 'moment'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import withRoot from 'lib/withRoot'

const styles = {
  root: {
    background: '#263238',
  },
  view: {
    paddingTop: '80px',
    width: '95%',
    margin: 'auto',
    textAlign: 'center'
  }
}

class App extends React.Component {
  state = { loading : false };


  componentDidMount() {
    moment.locale(navigator.language);
    this.setState({ loading: true });
  }

  render() {
    const { classes } = this.props;

    return this.state.loading === false ? '' : 
    (
      <div className={classes.root} style={{background: 'linear-gradient(to right bottom, #A0A0A0, #D0D0D0)', minHeight: '100vh'}}>
        <main>
          <div className={classes.view}>
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
