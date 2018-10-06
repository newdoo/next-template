import React from 'react'
import moment from 'moment'

import styles from './History.scss';
import classNames from 'classnames/bind';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'

import HistoryPopup from '@components/bustabit/HistoryPopup'

const cx = classNames.bind(styles);

class History extends React.Component {
  state = {popup: false, detial: null}

  onDetail = value => async() => {
    console.log(value);
    this.setState({popup: true, detial: value});
  }

  render() {
    const { history } = this.props;

    return ( 
      history === null ? <CircularProgress/> : 
      <React.Fragment>
        <List className={cx('content','list')}>
          {
            history.map(value => (
              <ListItem dense button key={value.seed} onClick={this.onDetail(value)}>
                <ListItemText primary={'Bust : ' + value.number.toFixed(1) + ' - ' + moment(value.time).format('LLL')} secondary={'seed : ' + value.seed}/>
              </ListItem>              
            ))
          }
        </List>
        <HistoryPopup 
          open={this.state.popup} 
          detail={this.state.detial} 
          onClose={() => this.setState({popup: false})}
        />
      </React.Fragment>
    )  
  }
}


export default History;