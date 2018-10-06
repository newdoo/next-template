import React from 'react'
import { connect } from 'react-redux'

import ListItemText from '@material-ui/core/ListItemText'

import Network from '@lib/network'

import BettingInfo from '@components/bustabit/BettingInfo';

class BettingInfoContainer extends React.Component {

  randomImage = () => {
    const list = ['http://health.chosun.com/site/data/img_dir/2016/07/01/2016070101161_0.jpg', 'https://t1.daumcdn.net/cfile/tistory/193AD54D4E4C9A0412', 'https://t1.daumcdn.net/cfile/tistory/19600C0F4AC07AE5EF'];

    const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    return list[randomRange(0, 2)];
  }

  onUserDetail = account => async() => {
    const msg = await Network('user', 'detail', {account, start: 0, count: 0});
    console.log(msg);
  }

  render() {

    console.log(this.props.stop);
    console.log(this.props.stop.get('bettings'));

    return (
      <BettingInfo
        bettings={this.props.stop.get('bettings')}
        onClick={this.onUserDetail}
        src={this.randomImage()}
      />
    )  
  }
}

export default connect(
  (state) => ({
    stop: state.stop.get('stop')
  }),
  (dispatch) => ({

  })
)(BettingInfoContainer);