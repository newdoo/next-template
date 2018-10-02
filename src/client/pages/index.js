import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import App from "components/app"
import Scene from './scene'
import UIButton from 'ui/uiButton'

import styles from "styles/base.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

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

        <div className={cx('example')}>Hello World!</div>

        <UIButton link='stop'>GO</UIButton>
        <UIButton link='list'>Blog</UIButton>
      </App>
    )  
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);