import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import UIButton from 'ui/uiButton'

const styles = theme => ({
});

class Index extends Scene {
  componentDidMount = async() => {
    super.componentDidMount();
  } 

  render() {
    const {classes} = this.props;

    return (
      <App>
        <Fade in={this.state.loading}>
          <Typography variant={this.state.isMobile ? 'display1' : 'display4'}>
            NEXT-TEMPLATE
          </Typography>
        </Fade>

        <UIButton link='stop'>GO</UIButton>
        <UIButton link='blog'>Blog</UIButton>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);