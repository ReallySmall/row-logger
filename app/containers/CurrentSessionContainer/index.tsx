import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import { ChartOverview, Loading } from '../../components';
import { columns } from '../../columns/columns';
import { sessionFilters } from '../../forms';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class CurrentSessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { appConnected, loggerConnected } = this.props;

        return (

            <div>
                {!appConnected &&
                    <Loading message="Connecting to service" />
                }
                {appConnected && !loggerConnected &&
                    <Loading message="Connect and switch on your logger" />
                }
                {loggerConnected && appConnected &&
                    <article>
                        <h1>CONNECTED</h1>
                    </article>
                }
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        appConnected: state.active.appConnected,
        loggerConnected: state.active.loggerConnected
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(CurrentSessionContainer);