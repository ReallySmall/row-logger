import * as React from 'react';
import * as rolesConstants from '../../constants/roles';
import * as sessionActions from '../../actions/sessions';
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
import { utilsHelpers, routingHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class SessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    componentDidMount(){

        const { sessionActions, processing, sessions } = this.props;
        const { sessionsRequest } = sessionActions;

    }

    render() {

        const { processing, error, totals, sessions } = this.props;

        return (

            <div>
                {processing &&
                    <Loading message="Getting session data" />
                }
                {!processing &&
                    <article className="row">
                        <aside className="col s12 m3">
                            <h4>Data</h4>
                            <div className="card">
                                <div className="card-content">

                                </div>
                            </div>
                        </aside>
                        <section className="col s12 m9">
                            <h4>Chart</h4>
                            <div className="card">
                                <div className="card-content">

                                </div>
                            </div>
                            <button className="btn">Export as CSV</button>
                        </section>
                    </article>
                }
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.sessions.processing,
        error: state.sessions.error,
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
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(SessionContainer);