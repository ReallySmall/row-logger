import * as React from 'react';
import * as classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Interfaces } from './interfaces';

export class Column extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { title, hideTitle, children, width } = this.props;

        return (

            <Grid item xs={12} sm={width}>
                <section>
                    {!hideTitle &&
                        <Typography variant="title" className={hideTitle ? 'visually-hidden' : ''} gutterBottom>{title}</Typography>
                    }
                    {children}
                </section>
            </Grid>

        );

    }
}
