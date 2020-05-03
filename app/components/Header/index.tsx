import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RowingIcon from '@material-ui/icons/Rowing';
import { Interfaces } from './interfaces';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        span: {
            verticalAlign: 'middle'
        }
    },
    homeLink: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: '18px',
        lineHeight: '25px'
    },
    homeIcon: {
        verticalAlign: 'middle',
        fill: 'white',
        marginRight: 10
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

class HeaderWrapped extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleTabChanges = this.handleTabChanges.bind(this);

        this.state = {
            anchorEl: null,
        };

    }

    private handleLogOut(event: any): void {

        const { logOutRequest } = this.props.authActions;

        event.preventDefault();
        logOutRequest();

    }

    private handleTabChanges(event: any, tab: string): void {

        const { handleTabChange } = this.props;

        handleTabChange(tab);

    }

    render() {

        const { classes, heading, isLoggedIn, userName, tabs, activeTab } = this.props;
        const { anchorEl } = this.state;

        return (

            <AppBar position="sticky">
                <Toolbar disableGutters={true}>
                    <div className={classes.flex}>
                        <Typography>
                            <NavLink to="/" className={classes.homeLink}>
                                <RowingIcon className={classes.homeIcon} />
                                <span>Row</span>
                                <span className="italic">logger</span>
                            </NavLink>
                        </Typography>
                    </div>
                    {isLoggedIn &&
                        <>
                            <Tabs
                                value={activeTab}
                                onChange={this.handleTabChanges}>
                                {tabs.map((tab, index) => <Tab key={index} label={tab.label} value={tab.value} />)}
                            </Tabs>
                            <Button onClick={this.handleLogOut}>Logout</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>

        );
    }
}

export const Header = withStyles(styles)(HeaderWrapped);