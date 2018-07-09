import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as authActions from '../../actions/auth';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { RootState } from '../../reducers';
import { routes } from '../../routes';
import { appConfig } from '../../config';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { RegisterContainer, AccountContainer, PublicContainer, OverviewContainer, SessionsContainer, SessionContainer, CurrentSessionContainer, LoginContainer } from '../../containers';
import { ErrorPage, Header } from '../../components';
import { mergePropsForConnect } from '../../helpers/utils';
import { getSessionDataViaLocalStorage } from '../../helpers/storage';
import { Interfaces } from './interfaces';

class App extends React.Component<Interfaces.Props, Interfaces.State> {

    // the constructor of App is where any initial setup should happen, e.g. automatic authentication
    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleTabChange = this.handleTabChange.bind(this);

        const { logInRequestWithJWT } = this.props.authActions;
        const loginData: string = sessionStorage.getItem(appConfig.auth.sessionState); // look for a JWT in session storage

        getSessionDataViaLocalStorage(loginData, logInRequestWithJWT); // if there's another tab with the authenticated app open, copy authentication to this tab
        logInRequestWithJWT(); // when the app first loads, check whether a JWT exists in sessionStorage to auto-login

        // if the initial requested route is anything other than the root, store it in state
        // this will be used later to redirect user to requested route once successfully logged in
        this.state = {
            requestedInitialPath: props.location.pathname !== routes.base.pathname ? props.location.pathname : null
        };

    }

    componentDidUpdate() {

        const { isLoggedIn, location, history } = this.props;
        const { requestedInitialPath } = this.state;

        // once logged in, if a particular page was originally requested, go to it
        if (isLoggedIn && requestedInitialPath && (requestedInitialPath !== location.pathname)) {
            this.setState({
                requestedInitialPath: null
            }, history.push(requestedInitialPath));
        }

    }

    handleTabChange(tabSelected: any){

        const { history } = this.props;

        history.push(tabSelected);

    }

    // the render method of App builds the main page layout and renders content based on routing and current user permissions
    render() {

        const { location, isLoggedIn, userName, appConnected, authActions } = this.props;
        const socketActiveClass: string = appConnected ? '' : 'disabled';

        const tabs = [
            {
                label: 'Overview',
                value: routes.base.pathname
            },
            {
                label: 'Sessions',
                value: routes.sessions.pathname
            },
            {
                label: 'Active session',
                value: routes.activeSession.pathname
            }
        ];

        return (

            <div>
                <h1 className="visually-hidden">RowLogger</h1>
                <Header heading="RowLogger" isLoggedIn={isLoggedIn} userName={userName} authActions={authActions} tabs={tabs} activeTab={location.pathname} handleTabChange={this.handleTabChange} />
                <main>
                    <Switch>
                        <Route exact path={routes.base.pathname} render={() => isLoggedIn ? <OverviewContainer routing={location} /> : <PublicContainer /> } />
                        <Route exact path={routes.sessions.pathname} render={() => isLoggedIn ? <SessionsContainer routing={location} /> : <Redirect to={routes.base.pathname} /> } />
                        <Route exact path={routes.activeSession.pathname} render={() => isLoggedIn ? <CurrentSessionContainer routing={location} /> : <Redirect to={routes.base.pathname} /> } />
                        <Route exact path={routes.session.pathname} render={() => isLoggedIn ? <SessionContainer routing={location} /> : <Redirect to={routes.base.pathname} /> } />
                        <Route exact path={routes.login.pathname} render={() => isLoggedIn ? <Redirect to={routes.base.pathname} /> : <LoginContainer />} />
                        <Route exact path={routes.register.pathname} render={() => isLoggedIn ? <Redirect to={routes.base.pathname} /> : <RegisterContainer />} />
                        <Route exact path={routes.account.pathname} render={() => !isLoggedIn ? <Redirect to={routes.base.pathname} /> : <AccountContainer />} />
                        <Route render={() => <ErrorPage title="Page not found" description="This page may have been moved or deleted." />} />
                    </Switch>
                </main>
                <svg className="page-background" viewBox="0 0 100 25">
                    <path fill="#1f88e6" opacity="0.5" d="M0 30 V15 Q30 3 60 15 V30z" />
                    <path fill="#1e387e" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                </svg>
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userName: state.auth.userName,
        appConnected: state.active.appConnected
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch, props) {
    return {
        authActions: bindActionCreators(authActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
//export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)((withStyles(styles))(App));
export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)(App);