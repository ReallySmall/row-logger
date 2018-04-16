import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { Logout } from '../../components';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class LogoutContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    componentDidMount() {

        const { logOutRequest } = this.props.actions;

        logOutRequest();

    }

    render() {

        const { processing } = this.props;

        return (
            <Logout processing={processing} />
        );

    }
}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState) {
    return {
        processing: state.auth.processing
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(LogoutContainer);