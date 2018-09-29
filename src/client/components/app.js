import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Provider } from 'mobx-react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import moment from 'moment'

import withRoot from 'lib/withRoot'
import dataManager from 'lib/dataManager'


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

@observer class App extends React.Component {
  @observable loading = false;

  constructor(props){
    super(props);
    this.dataManager = dataManager;
  }
  
  componentDidMount() {
    moment.locale(navigator.language);
    this.loading = true;
  }

  render() {
    const {classes} = this.props;

    return this.loading === false ? '' : 
    (
      <Provider dataManager={dataManager}>
        <div className={classes.root} style={{background: 'linear-gradient(to right bottom, #646464, #AAAAAA)', minHeight: '100vh'}}>
          <main>
            <div className={classes.view}>
              {this.props.children}
            </div>
          </main>
        </div>
      </Provider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
