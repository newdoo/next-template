import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'

import App from "components/app"
import Scene from './scene'
import Chatting from 'components/chatting'
import Game from 'components/game'

const styles = theme => ({
});

class InGame extends Scene {
    state = {};

    componentDidMount = async() => {
        super.componentDidMount();
    }
    
    render() {
        const { classes } = this.props;

        return (
        <App>
            <Fade in={this.state.loading}>
                <Grid container spacing={8}>
                    <Grid container justify='center' item md={6}>
                        <Game isMobile={this.state.isMobile}/>
                    </Grid>
                <Grid container justify='center' item md={6}>
                    <Chatting/>
                </Grid>
          </Grid>

            </Fade>
        </App>
        )  
    }
}

InGame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InGame);
