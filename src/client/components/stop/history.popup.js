import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class HistoryPopup extends React.Component {
  render() {
    const {open, onClose, detail} = this.props;
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
    )    
  }
}