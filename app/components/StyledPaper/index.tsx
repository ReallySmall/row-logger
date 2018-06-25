import * as React from 'react';
import * as classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Interfaces } from './interfaces';

const styles = {
  root: {
    padding: '24px'
  }
};

export class StyledPaperWrapped extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { classes, children } = this.props;

        return (

            <Paper className={classes.root}>
                {children}
            </Paper>

        );

    }
}

export const StyledPaper = withStyles(styles)(StyledPaperWrapped);
