import * as React from 'react';
import * as authActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { RootState } from '../../reducers';
import { routes } from '../../routes';
import { appConfig } from '../../config';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { RegisterContainer, AccountContainer, PublicContainer, OverviewContainer, SessionsContainer, SessionContainer, CurrentSessionContainer, LoginContainer, IdleContainer } from '../../containers';
import { Header, ErrorPage, StickyWrapper } from '../../components';
import { mergePropsForConnect } from '../../helpers/utils';
import { getSessionDataViaLocalStorage } from '../../helpers/storage';
import { Interfaces } from './interfaces';

class App extends React.Component<Interfaces.Props, Interfaces.State> {

    // the constructor of App is where any initial setup should happen, e.g. automatic authentication
    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

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

    // the render method of App builds the main page layout and renders content based on routing and current user permissions
    render() {

        const { location, isLoggedIn, appConnected, authActions } = this.props;
        const socketActiveClass: string = appConnected ? '' : 'disabled';

        return (

            <div>
                <h1 className="visually-hidden">RowLogger</h1>
                <Header heading="RowLogger" isLoggedIn={isLoggedIn} authActions={authActions}>
                    {isLoggedIn &&
                        <StickyWrapper>
                            <div className="nav-content container">
                                <ul className="tabs tabs-transparent">
                                    <li className="tab"><NavLink to={routes.base.pathname}>Overview</NavLink></li>
                                    <li className="tab"><NavLink to={routes.sessions.pathname}>Sessions</NavLink></li>
                                    <li className="tab"><NavLink to={routes.activeSession.pathname} className={socketActiveClass}>Active session</NavLink></li>
                                </ul>
                            </div>
                        </StickyWrapper>
                    }
                </Header>
                <main>
                    {!isLoggedIn && location.pathname !== routes.base.pathname && location.pathname !== routes.login.pathname && location.pathname !== routes.register.pathname &&
                        <Redirect to={routes.base.pathname} />
                    }
                    <Switch>
                        <Route exact path={routes.base.pathname} render={() => isLoggedIn ? <OverviewContainer routing={location} /> : <PublicContainer /> } />
                        <Route exact path={routes.sessions.pathname} render={() => <SessionsContainer routing={location} />} />
                        <Route exact path={routes.activeSession.pathname} render={() => <CurrentSessionContainer routing={location} />} />
                        <Route exact path={routes.session.pathname} render={() => <SessionContainer routing={location} />} />
                        <Route exact path={routes.login.pathname} render={() => isLoggedIn ? <Redirect to={routes.base.pathname} /> : <LoginContainer />} />
                        <Route exact path={routes.register.pathname} render={() => isLoggedIn ? <Redirect to={routes.base.pathname} /> : <RegisterContainer />} />
                        <Route exact path={routes.account.pathname} render={() => !isLoggedIn ? <Redirect to={routes.base.pathname} /> : <AccountContainer />} />
                        <Route render={() => <ErrorPage title="Page not found" description="This page may have been moved or deleted." />} />
                    </Switch>
                </main>
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
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
export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)(App);