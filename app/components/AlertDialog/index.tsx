import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Interfaces } from './interfaces';

export class AlertDialog extends React.Component<Interfaces.Props, Interfaces.State>  {

  constructor(props?: Interfaces.Props, context?: any) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this); // bind method
  }

  handleClose() {

    const { closeHandler, test } = this.props;

    closeHandler(test);

  }

  render() {

    const { isActive, message } = this.props;

    return (
        <Dialog
          open={isActive}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Message</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>
    );
  }

}