import * as React from 'react';
import * as classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Interfaces } from './interfaces';

export const Column = (props: Interfaces.Props) => {

    const { title, 
            hideTitle, 
            children, 
            width } = props;

    return (

        <Grid item xs={12} sm={width}>
            <section>
                {!hideTitle &&
                    <Typography variant="h2" className={hideTitle ? 'visually-hidden' : ''} gutterBottom>{title}</Typography>
                }
                {children}
            </section>
        </Grid>

    );

}
