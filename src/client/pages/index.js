import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import UIButton from 'ui/uiButton'

const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

class Index extends Scene {

  componentDidMount = async() => {
    super.componentDidMount();
  }

  render() {
    const { classes } = this.props;

    return (
      <App>
        <Fade in={this.state.loading}>
          <Typography variant={this.state.isMobile ? 'display1' : 'display4'}>
            Next-Template
          </Typography>
        </Fade>
        <UIButton link='ingame'>GO</UIButton>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
