import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/es/ArrowForward';
import { Props } from './interfaces';

const useStyles = makeStyles((theme: any) => createStyles({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        span: {
            verticalAlign: 'middle'
        }
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: '18px',
        lineHeight: '25px'
    }
}));

export const Header = (props: Props) => {

    const handleLogOut = (event: any): void => {

        const { logOutRequest } = props.authActions;

        event.preventDefault();
        logOutRequest();

    }

    const { flex, link } = useStyles(props);
    const { isLoggedIn, userName } = props;

    return (

        <AppBar position="sticky">
            <Toolbar disableGutters={true}>
                <div className={flex}>
                    <Typography>
                        <NavLink to="/" className={link}>
                            <span>Row</span>
                            <span className="italic">logger</span>
                        </NavLink>
                    </Typography>
                </div>
                {isLoggedIn &&
                    <>
                        <Typography>Welcome {userName}&nbsp;</Typography>
                        <ArrowForwardIcon />  
                        <Button onClick={handleLogOut}>Logout</Button>
                    </>
                }
            </Toolbar>
        </AppBar>

    );

}
