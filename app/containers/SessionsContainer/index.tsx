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

        const { sessionActions: { sessionsRequest }, 
                sessions } = this.props;

        !sessions && sessionsRequest({
            showRecent: false,
            limit: 100
        });

    }

    filterSubmit(filterValues){

        const { fromDate, toDate } = filterValues;
        const { sessionActions: { sessionsRequest } } = this.props;

        sessionsRequest({
            showRecent: false,
            limit: 100,
            fromDate: fromDate,
            toDate: toDate
        });

    }

    render() {

        const { totals, 
                sessions, 
                activeFilters } = this.props;

        const hasSessions: boolean = sessions && sessions.ids && sessions.ids.length;

        return (

            <Page title="Sessions">
                <Column title="Filter" width={3}>
                   <StyledPaper>
                        <FormContainer form="filters" onSubmit={this.filterSubmit} fieldData={sessionFilters} initialValues={activeFilters} />
                    </StyledPaper>
                </Column>
                <Column title="Sessions" width={9}>
                    <div>
                        {sessions && 
                            <Paper>
                                <GridBodyContainer columns={columns} items={sessions.items} ids={sessions.ids} showHeader={true} sortable={false} />
                            </Paper>
                        }
                    </div>
                </Column>
            </Page>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        sessions: state.sessions.sessions,
        activeFilters: state.sessions.params
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionsContainer);