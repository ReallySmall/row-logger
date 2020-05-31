import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/es/ExpandMore';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as selectors from '../../selectors';
import * as errorActions from '../../actions/error';
import * as authActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { Switch, Route } from 'react-router-dom';
import { HomeContainer } from '../../containers';
import { ErrorPage, ErrorModal, Header, Loading, Column } from '../../components';
import { mergePropsForConnect } from '../../helpers/utils';
import { Interfaces } from './interfaces';

class App extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        const { isLoggedIn } = props;

        this.handleLogin = this.handleLogin.bind(this);
        this.handleTogglePanel = this.handleTogglePanel.bind(this);

        this.state = {
            isPanelExpanded: isLoggedIn
        };

    }

    private handleLogin(): void {

        const { authActions: { logInRequest } } = this.props;

        logInRequest(true);

    }

    private handleTogglePanel(): void {

        const { isPanelExpanded } = this.state;

        this.setState({
            isPanelExpanded: !isPanelExpanded
        });

    }

    public componentDidMount(){

        const { authActions: { logInRequest } } = this.props;

        logInRequest();

    }

    public render(): any {

        const { isPanelExpanded } = this.state;
        const { isLoggedIn,
                isProcessing,
                error,
                userName, 
                appConnected, 
                authActions,
                errorActions: { clearError } } = this.props;

        const expandIcon: any = isLoggedIn ? <ExpandMoreIcon /> : null;

        return (

            <div>
                <h1 className="visually-hidden">RowLogger</h1>
                <Header 
                    heading="RowLogger" 
                    isLoggedIn={isLoggedIn} 
                    userName={userName} 
                    authActions={authActions} />
                <main>
                    <Column title="About" shouldHideTitle={true} width={12}>
                        <ExpansionPanel expanded={isPanelExpanded || !isLoggedIn} onChange={this.handleTogglePanel}>
                            <ExpansionPanelSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                expandIcon={expandIcon}>
                                    <Typography>An IOT app for tracking indoor rowing using a Bluetooth Low Energy device and Google sheets.</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>Lorem ipsum.</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {!isLoggedIn &&
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleLogin}>
                                    Login with Google
                            </Button>
                        }            
                    </Column>
                    <ErrorModal error={''} name="SESSIONS" clearErrorAction={clearError} />
                    {isProcessing

                        ?   <Loading message="Processing" />
                            
                        :   <Switch>
                                <Route exact path="/" render={() => isLoggedIn ? <HomeContainer /> : null } />
                                <Route render={() => <ErrorPage title="Page not found" description="This page may have been moved or deleted." />} />
                            </Switch>  
                    
                    }
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