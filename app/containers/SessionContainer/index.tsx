import * as React from 'react';
import * as rolesConstants from '../../constants/roles';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../../containers/FormContainer';
import { Loading, ErrorPage, Icon, MainContentWrapper, PageHeader, LineChart } from '../../components';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers, routingHelpers, dateTimeHelpers, rowingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class SessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    componentDidMount(){

        const { session, sessionActions, processing, routing } = this.props;
        const { sessionRequest } = sessionActions;
        const id: string = routing.pathname.replace('/sessions/', '');

        if(!processing && !session){
            sessionRequest(id);
        }

    }

    render() {

        const { processing, error, session } = this.props;

        return (

            <div>
                {error &&
                    <ErrorPage title="Not found" description="This session does not exist" />
                }
                {!error && processing &&
                    <Loading message="Getting session data" />
                }
                {!error && !processing && session &&
                    <div>
                        <PageHeader title={dateTimeHelpers.formatDateHumanFriendly(session.createdAt)}></PageHeader>
                            <MainContentWrapper sideBarContent={[]}>
                                <article className="row">
                                    <aside className="col s12 m3">
                                        <h4 className="visually-hidden">Data</h4>
                                        <div className="card">
                                        <p>
                                            <a className="btn-floating halfway-fab waves-effect waves-light">
                                                <Icon name="edit" />
                                            </a>
                                        </p>
                                        <div className="card-content">
                                            <ul className="plain">
                                                {session.distance &&
                                                    <li>
                                                        <p><strong>Distance</strong></p>
                                                        <p>{rowingHelpers.metrestoKmString(session.distance)}</p>
                                                    </li>
                                                }
                                                {session.time &&
                                                    <li>
                                                        <p><strong>Time</strong></p>
                                                        <p>{dateTimeHelpers.millisToDuration(session.time)}</p>
                                                    </li>
                                                }
                                                <li>
                                                    <p><strong>Average speed</strong></p>
                                                    <p>{rowingHelpers.metresSecondstoAverageSpeedString(session.distance, session.time)}</p>
                                                </li>
                                                {session.machineId &&
                                                    <li>
                                                        <p><strong>Rower type</strong></p>
                                                        <p>{session.machineId}</p>
                                                    </li>
                                                }
                                                {session.damping &&
                                                    <li>
                                                        <p><strong>Damping level</strong></p>
                                                        <p>{session.damping}</p>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                                <section className="col s12 m9">
                                    <h4 className="visually-hidden">Chart</h4>
                                    <div className="card">
                                        <div className="card-content">
                                            <LineChart data={session.data} />
                                        </div>
                                    </div>
                                    <button className="btn">Export as CSV</button>
                                </section>
                            </article>
                        </MainContentWrapper>
                    </div>
                }
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {

    const {routing} = props;
    const id: string = routing.pathname.replace('/sessions/', '');

    return {
        processing: state.loading['SESSION'],
        error: state.error['SESSION'],
        session: state.session.data[id]
    };

}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionContainer);