import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RowingIcon from '@material-ui/icons/Rowing';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Interfaces } from './interfaces';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    svg: {
        verticalAlign: 'middle'
    },
    span: {
        verticalAlign: 'middle'
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class HeaderWrapped extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.state = {
            anchorEl: null,
        };

        this.logOut = this.logOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTabChanges = this.handleTabChanges.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    logOut(event: any) {

        const { logOutRequest } = this.props.authActions;

        event.preventDefault();
        logOutRequest();

    }

    handleTabChanges = (event, tab) => {

        const { handleTabChange } = this.props;

        handleTabChange(tab);

    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {

        const { classes, heading, isLoggedIn, userName, tabs, activeTab } = this.props;
        const { anchorEl } = this.state;

        return (

            <AppBar position="sticky">
                <Toolbar disableGutters={true}>
                    <Typography className={classes.flex} variant="title" color="inherit">
                        <RowingIcon />
                        <span>Row</span>
                        <span className="italic">logger</span>
                    </Typography>
                    {isLoggedIn && (
                        <Tabs
                            value={activeTab}
                            onChange={this.handleTabChanges}
                            >
                            {tabs.map((tab, index) => <Tab key={index} label={tab.label} value={tab.value} />)}
                        </Tabs>
                    )}
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.handleClick}>
                            <AccountCircle />
                    </IconButton>
                    <Menu
                        id="settings-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                            {isLoggedIn &&
                                <MenuItem onClick={this.handleClose}>
                                    <NavLink to="/account" className="button button-primary">{userName}</NavLink>
                                </MenuItem>
                            }
                            {isLoggedIn &&
                                <MenuItem onClick={this.handleClose}>
                                    <a href="#" className="button button-primary" onClick={this.logOut}>Log out</a>
                                </MenuItem>
                            }
                            {!isLoggedIn &&
                                <MenuItem onClick={this.handleClose}>
                                    <NavLink to="/login" className="button button-primary">Log in</NavLink>
                                </MenuItem>
                            }
                            {!isLoggedIn &&
                                <MenuItem onClick={this.handleClose}>
                                    <NavLink to="/register" className="button button-primary">Register</NavLink>
                                </MenuItem>
                            }
                    </Menu>
                </Toolbar>
            </AppBar>

        );
    }
}

export const Header = withStyles(styles)(HeaderWrapped);