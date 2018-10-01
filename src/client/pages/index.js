import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import Test from 'components/test'

const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

class Index extends Scene {
  state = { fadeInOut: false };

  componentDidMount = async() => {
    super.componentDidMount();
    this.setState({ fadeInOut: true });
  }

  render() {
    const {classes} = this.props;

    return (
      <App>
        <Fade in={this.state.fadeInOut}>
          <Typography variant={this.state.isMobile ? 'display1' : 'display4'}>

            Next-Template
          </Typography>
        </Fade>

        <div className={classes.menu}>
          <Test/>
        </div>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
