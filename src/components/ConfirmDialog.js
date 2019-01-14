import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ isOpen, question, handleClose }) =>
  <Dialog
    open={isOpen}
    onClose={() => handleClose(false)}
  >
    <DialogTitle>{question}</DialogTitle>
    <DialogActions>
      <Button onClick={() => handleClose(false)} color="primary">
        No
      </Button>
      <Button onClick={() => handleClose(true)} color="primary" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>

export default ConfirmDialog;
