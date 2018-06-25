import * as React from 'react';
import * as classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Interfaces } from './interfaces';

export class ErrorModal extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.clearError = this.clearError.bind(this);
    }

    clearError(){

        const { clearErrorAction, name } = this.props;

        clearErrorAction(name);

    }

    render() {

        const { error } = this.props;

        return (

            <Dialog
                open={Boolean(error)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{error}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={this.clearError}>Ok</Button>
                    </DialogActions>
            </Dialog>

        );
    }
}