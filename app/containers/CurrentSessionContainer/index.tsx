import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
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

class CurrentSessionContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { appConnected, loggerConnected } = this.props;

        return (

            <div>
                {(!loggerConnected || !appConnected) &&
                    <Loading message="Awaiting connection" />
                }
                {loggerConnected && appConnected &&
                    <article className="row">

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