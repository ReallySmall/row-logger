import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { routes } from '../../routes';
import { appConfig } from '../../config';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

const Idle = require('react-idle'); // TODO this needs to be an ES6 import once a type file has been written

class IdleContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }

    logOut(message?) {

        const { logOutRequest } = this.props.authActions;

        logOutRequest(message);

    }

    render() {

        const { isLoggedIn, processing } = this.props;

        return (

            <Idle
                timeout={appConfig.auth.idleTimeout}
                onChange={({ idle }) => {
                    if (idle && !processing && isLoggedIn) {
                        this.logOut(appConfig.auth.messages.idleTimeout);
                    }
                }} />

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        processing: state.auth.processing || state.dashboard.processing || state.details.processing
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(IdleContainer);