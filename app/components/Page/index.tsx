import * as React from 'react';
import * as classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { Interfaces } from './interfaces';

export class Page extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { title, children } = this.props;

        return (

            <article>
                <h1 className="visually-hidden">{title}</h1>
                <Grid container>
                    {children}
                </Grid>
            </article>

        );

    }
}
