import * as React from 'react';
import * as rolesConstants from '../../constants/roles';
import * as sessionActions from '../../actions/sessions';
import * as tabActions from '../../actions/tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridHeaderContainer, GridBodyContainer } from '../../containers';
import { ChartOverview, Loading } from '../../components';
import { NavLink } from 'react-router-dom';
import { columns } from '../../columns/columns';
import { totalsColumns } from '../../columns/totals';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers, routingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class OverviewContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    componentDidMount(){

        const { sessionActions, processing, totals, recentSessions } = this.props;
        const { sessionsRequest, sessionTotalsRequest } = sessionActions;

        if(!processing){

            !totals && sessionTotalsRequest();
            !recentSessions && sessionsRequest({
                showRecent: true,
                limit: 5
            });

        }

    }

    render() {

        const { processing, error, totals, recentSessions } = this.props;
        const progress: number = totals ? totals.items[totals.ids[0]].distance : 0;
        const hasSessions: boolean = recentSessions && recentSessions.ids && recentSessions.ids.length;

        return (

            <div className="container">
                <article className="row">
                    <section className="col s12 m4">
                        <h4>Totals</h4>
                        <div className="card">
                            <div className="card-content">
                                {processing && <Loading />}
                                {!processing && totals &&
                                    <div>
                                        <GridBodyContainer columns={totalsColumns} items={totals.items} ids={totals.ids} showHeader={true} sortable={false} />
                                        <ChartOverview total={112000} progress={progress} />
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                    <section className="col s12 m8">
                        <h4>Recent</h4>
                        <div className="card">
                            <div className="card-content">
                                {processing && <Loading />}
                                {!processing && recentSessions && <GridBodyContainer columns={columns} items={recentSessions.items} ids={recentSessions.ids} showHeader={true} sortable={false} />}
                            </div>
                        </div>
                        {hasSessions
                            ? <p><NavLink to="/sessions" className="waves-effect waves-light btn">View all sessions</NavLink></p>
                            : null
                        }
                    </section>
                </article>
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        roles: state.auth.roles,
        processing: state.loading['SESSION_TOTALS'],
        error: state.error['SESSION_TOTALS'],
        totals: state.overview.totals,
        recentSessions: state.overview.recentSessions
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(OverviewContainer);