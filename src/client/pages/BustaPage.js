import React from 'react';
import App from "@components/app"
import Scene from './scene'

import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'

import GameContainer from '@containers/bustabit/GameContainer'
import GameInfoContainer from '@containers/bustabit/GameInfoContainer';
import ContentContainer from '@containers/bustabit/ContentContainer';
import BettingInfoContainer from '@containers/bustabit/BettingInfoContainer';

class BustaPage extends Scene {
  state = {};

  componentDidMount = async() => {
    super.componentDidMount();
  }

  render() {

    return (
      <App>
        <Fade in={this.state.loading}>
          <Grid container spacing={0} >
            <Grid container item spacing={0} md={8}>
              <Grid container>
                <Grid item md>
                  <GameContainer isMobile={this.state.isMobile}/>
                </Grid>
                <Grid item md={3}>
                  <GameInfoContainer/>
                </Grid>
              </Grid>
              <Grid item md>
                <ContentContainer/>
              </Grid>
            </Grid>
            <Grid item md>
              <BettingInfoContainer/>
            </Grid>
          </Grid>
        </Fade>
      </App>
    )  
  }

}

export default BustaPage;