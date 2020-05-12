import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import * as authActions from '../../actions/auth';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import { Page, Column, StyledPaper } from '../../components';
import { columns } from '../../columns/columns';
import { sessionFilters } from '../../forms';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class HomeContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

    }

    private handleLogin(): void {

        const { authActions: { logInRequest } } = this.props;

        logInRequest(true);

    }

    private handleFilterSubmit(filterValues): void {

        const { fromDate, toDate } = filterValues;
        const { sessionActions: { sessionsRequest } } = this.props;

        sessionsRequest({
            showRecent: false,
            limit: 100,
            fromDate: fromDate,
            toDate: toDate
        });

    }

    public componentDidMount(): void {

        const { sessionActions: { sessionsRequest }, 
                sessions } = this.props;

        !sessions && sessionsRequest({
            showRecent: false,
            limit: 100
        });

    }

    render() {

        const { isLoggedIn,
                sessions, 
                activeFilters } = this.props;

        const hasSessions: boolean = sessions && sessions.ids && sessions.ids.length;

        return (

            <Page title="Sessions">
                <Column title="About" width={12}>
                    <StyledPaper>
                        <Typography>An IOT app for tracking indoor rowing using a Bluetooth Low Energy device and Google sheets.</Typography>
                        {!isLoggedIn &&
                            <Button 
                                variant="raised" 
                                size="large" 
                                color="secondary"
                                onClick={this.handleLogin}>
                                    Login with Google
                            </Button>
                        }
                    </StyledPaper>
                </Column>
                {isLoggedIn && hasSessions &&
                    <>
                        <Column title="Filter" width={3}>
                           <StyledPaper>
                                <FormContainer 
                                    form="filters" 
                                    onSubmit={this.handleFilterSubmit} 
                                    fieldData={sessionFilters} 
                                    initialValues={activeFilters} />
                            </StyledPaper>
                        </Column>
                        <Column title="Sessions" width={9}>
                            <div>
                                {sessions && 
                                    <Paper>
                                        <GridBodyContainer 
                                            columns={columns} 
                                            items={sessions.items} 
                                            ids={sessions.ids} 
                                            showHeader={true} 
                                            sortable={false} />
                                    </Paper>
                                }
                            </div>
                        </Column>
                    </>
                }
            </Page>

        );

    }

}

const mapStateToProps = (state: RootState): any => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        sessions: state.sessions.sessions,
        activeFilters: state.sessions.params
    };
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(HomeContainer);