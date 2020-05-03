import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import * as selectors from '../../selectors';
import * as errorActions from '../../actions/error';
import * as authActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { routes } from '../../routes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HomeContainer, SessionContainer, CurrentSessionContainer } from '../../containers';
import { StyledPaper, ErrorPage, ErrorModal, Header, Loading } from '../../components';
import { mergePropsForConnect } from '../../helpers/utils';
import { Interfaces } from './interfaces';

class App extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleTabChange = this.handleTabChange.bind(this);

    }

    private handleTabChange(tabSelected: string): void {

        const { history } = this.props;

        history.push(tabSelected);

    }

    public componentDidMount(){

        this.props.authActions.logInRequest();

    }

    public render(): any {

        const { location, 
                isLoggedIn,
                isProcessing,
                error,
                userName, 
                appConnected, 
                authActions,
                errorActions: { clearError } } = this.props;

        const tabs = [
            {
                label: 'Home',
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
                <Header 
                    heading="RowLogger" 
                    isLoggedIn={isLoggedIn} 
                    userName={userName} 
                    authActions={authActions} 
                    tabs={tabs} 
                    activeTab={location.pathname} 
                    handleTabChange={this.handleTabChange} />
                <main>
                    <ErrorModal error={''} name="SESSIONS" clearErrorAction={clearError} />
                    <Modal open={isProcessing}>
                        <StyledPaper>
                            <Loading message="Processing" />
                        </StyledPaper>
                    </Modal>
                    <Switch>
                        <Route exact path={routes.base.pathname} render={() => <HomeContainer routing={location} /> } />
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

const mapStateToProps = (state: RootState) => {
    return {
        isProcessing: selectors.getIsProcessing(state),
        isLoggedIn:  selectors.getIsLoggedIn(state),
        userName: selectors.getUserName(state),
        error: selectors.getError(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergePropsForConnect)(App);