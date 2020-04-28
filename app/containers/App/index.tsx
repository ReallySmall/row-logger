import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as selectors from '../../selectors';
import * as errorActions from '../../actions/error';
import * as authActions from '../../actions/auth';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { RootState } from '../../reducers';
import { routes } from '../../routes';
import { appConfig } from '../../config';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { RegisterContainer, AccountContainer, PublicContainer, OverviewContainer, SessionsContainer, SessionContainer, CurrentSessionContainer, LoginContainer } from '../../containers';
import { StyledPaper, ErrorPage, ErrorModal, Header, Loading } from '../../components';
import { mergePropsForConnect } from '../../helpers/utils';
import { getSessionDataViaLocalStorage } from '../../helpers/storage';
import { Interfaces } from './interfaces';

class App extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleTabChange = this.handleTabChange.bind(this);

    }

    handleTabChange(tabSelected: any){

        const { history } = this.props;

        history.push(tabSelected);

    }

    render() {

        const { location, 
                isLoggedIn,
                processing,
                error,
                userName, 
                appConnected, 
                authActions,
                errorActions: { clearError } } = this.props;

        const socketActiveClass: string = appConnected ? '' : 'disabled';

        const tabs = [
            {
                label: 'Overview',
                value: routes.base.pathname
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
                    <ErrorModal error={''} name="SESSIONS" clearErrorAction={clearError} />
                    {processing && 
                        <StyledPaper>
                            <Loading message="Getting sessions data" />
                        </StyledPaper>
                    }
                    <Switch>
                        <Route exact path={routes.base.pathname} render={() => isLoggedIn ? <SessionsContainer routing={location} /> : <PublicContainer /> } />
                        <Route exact path={routes.activeSession.pathname} render={() => isLoggedIn ? <CurrentSessionContainer routing={location} /> : <Redirect to={routes.base.pathname} /> } />
                        <Route exact path={routes.session.pathname} render={() => isLoggedIn ? <SessionContainer routing={location} /> : <Redirect to={routes.base.pathname} /> } />
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
        processing: selectors.getIsProcessing(state),
        error: state.error,
        isLoggedIn: state.auth.isLoggedIn,
        userName: state.auth.userName,
        appConnected: state.active.appConnected
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch, props) {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
//export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)((withStyles(styles))(App));
export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)(App);