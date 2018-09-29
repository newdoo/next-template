import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'

const styles = theme => ({
  menu: {
    width: '100%',
    paddingTop: '10%',
    padding: theme.spacing.unit * 4,
  }
});

@observer class Index extends Scene {
  @observable fadeInOut = false;

  componentDidMount = async() => {
    super.componentDidMount();
    this.fadeInOut = true;
  }

  render() {
    const {classes} = this.props;

    return (
      <App>
        <Fade in={this.fadeInOut}>
          <Typography variant={this.isMobile ? 'display1' : 'display4'}>
            Numix Block Chain
          </Typography>
        </Fade>

        <div className={classes.menu}>
        </div>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
