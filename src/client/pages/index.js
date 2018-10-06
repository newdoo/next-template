import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import Scene from './scene'
import App from "@components/app"
import UIButton from '@components/common/UIButton'

import styles from "@styles/base.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

class Index extends Scene {
  componentDidMount = async() => {
    super.componentDidMount();
  } 

  render() {

    return (
      <App>
        <Fade in={this.state.loading}>
          <Typography variant={this.state.isMobile ? 'display1' : 'display4'}>
            NEXT-TEMPLATE
          </Typography>
        </Fade>
        <div className={cx('example')}>Hello World!</div>
        <UIButton link='list'>Blog</UIButton>
        <UIButton link='test'>Test</UIButton>
        <UIButton link='bustabit'>Bustabit</UIButton>
      </App>
    )  
  }
}

export default Index;