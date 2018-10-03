import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'

import App from '@components/app'
import Scene from './scene'
import BettingInfo from '@components/stop/bettingInfo'
import GameInfo from '@components/stop/gameInfo'
import Contents from '@components/stop/contents'
import Game from '@components/stop/game'

export default class Stop extends Scene {
  state = {};

  componentDidMount = async() => {
    super.componentDidMount();
  }

  render() {
    const {classes} = this.props;

    return (
      <App>
        <Fade in={this.state.loading}>
          <Grid container spacing={0} >
            <Grid container item spacing={0} md={8}>
              <Grid container>
                <Grid item md>
                  <Game isMobile={this.state.isMobile}/>
                </Grid>
                <Grid item md={3}>
                  <GameInfo/>
                </Grid>
              </Grid>
              <Grid item md>
                <Contents/>
              </Grid>
            </Grid>
            <Grid item md>
              <BettingInfo/>
            </Grid>
          </Grid>
        </Fade>
      </App>
    )  
  }
}