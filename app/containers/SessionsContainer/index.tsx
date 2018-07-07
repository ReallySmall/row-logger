import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import * as errorActions from '../../actions/error';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import { Page, Column, ChartOverview, Loading, StyledPaper, ErrorModal } from '../../components';
import { columns } from '../../columns/columns';
import { sessionFilters } from '../../forms';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class SessionsContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.filterSubmit = this.filterSubmit.bind(this);
    }

    componentDidMount(){

        const { sessionActions, processing, sessions } = this.props;
        const { sessionsRequest } = sessionActions;

        if(!processing){

            !sessions && sessionsRequest({
                showRecent: false,
                limit: 100
            });

        }

    }

    filterSubmit(values){



    }

    render() {

        const { processing, error, totals, sessions } = this.props;
        const hasSessions: boolean = sessions && sessions.ids && sessions.ids.length;

        return (

            <Page title="Sessions">
                <ErrorModal error={error} name="LOGIN" clearErrorAction={errorActions.clearError} />
                <Column title="Filter" width={3}>
                   <StyledPaper>
                        <FormContainer form="filters" onSubmit={this.filterSubmit} fieldData={sessionFilters} disabled={!hasSessions} />
                    </StyledPaper>
                </Column>
                <Column title="Sessions" width={9}>
                    <div>
                        {processing && 
                            <StyledPaper>
                                <Loading message="Getting sessions data" />
                            </StyledPaper>
                        }
                        {!processing && sessions && 
                            <Paper>
                                <GridBodyContainer columns={columns} items={sessions.items} ids={sessions.ids} showHeader={true} sortable={false} />
                            </Paper>
                        }
                    </div>
                    {hasSessions
                        ? <Button>Export as CSV</Button>
                        : null
                    }
                </Column>
            </Page>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.loading['SESSIONS'],
        error: state.error['SESSIONS'],
        sessions: state.sessions.sessions
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionsContainer);