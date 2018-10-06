import React from 'react'
import styles from './HistoryPopup.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const HistoryPopup = ({open, onClose, detail}) => {

  if(detail === null) return '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}
      aria-labelledby='history-popup'
    >
      <DialogTitle id='history-popup-title'>
        Seed : {detail.seed}
      </DialogTitle>   
      <DialogContent>       
        <DialogContentText>
          {detail.seed}
          {detail.number}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryPopup;