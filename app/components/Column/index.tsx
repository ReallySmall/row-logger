import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Props } from './interfaces';

const useStyles = makeStyles((theme: any) => createStyles({
    root: {
        marginBottom: '32px'
    },
    heading: {
        position: (props: Props) => props.shouldHideTitle ? 'absolute' : 'relative',
        top: (props: Props) => props.shouldHideTitle ? '-10000px' : 'auto',
        left: (props: Props) => props.shouldHideTitle ? '-10000px' : 'auto',
        lineHeight: '32px',
        fontSize: '24px',
    }
}));

export const Column = (props: Props) => {

    const { title, 
            children, 
            width } = props;

    const { root, heading } = useStyles(props);

    return (

        <Grid item xs={12} sm={width} className={root}>
            <section>
                <Typography variant="h2" className={heading} gutterBottom>{title}</Typography>
                {children}
            </section>
        </Grid>

    );

}
