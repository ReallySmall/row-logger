import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as tabActions from '../../actions/tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridHeaderContainer, GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import { ChartOverview, Loading } from '../../components';
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

            <article>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={3}>
                        <aside>
                            <Typography variant="title" gutterBottom>Filter</Typography>
                            <Paper>
                                {processing && <Loading message="Getting sessions data" />}
                                {!processing && error && <p>{error}</p>}
                                {!processing && !error && <FormContainer form="filters" onSubmit={this.filterSubmit} fieldData={sessionFilters} disabled={!hasSessions} />}
                            </Paper>
                        </aside>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <section>
                            <Typography variant="title" gutterBottom>Sessions</Typography>
                            <Paper>
                                {processing && <Loading message="Getting sessions data" />}
                                {!processing && error && <p>{error}</p>}
                                {!processing && sessions && <GridBodyContainer columns={columns} items={sessions.items} ids={sessions.ids} showHeader={true} sortable={false} />}
                            </Paper>
                            {hasSessions
                                ? <button className="btn">Export as CSV</button>
                                : null
                            }
                        </section>
                    </Grid>
                </Grid>
            </article>

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
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionsContainer);