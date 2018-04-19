import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import login from '../../forms/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { Login } from '../../components';
import { appConfig } from '../../config';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class LoginContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.submit = this.submit.bind(this); // bind method
    }

    submit = (loginDetails: AppFormValues) => {

        const { logInRequest } = this.props.actions;

        logInRequest(loginDetails);

    }

    render() {

        const { processing, error } = this.props;

        return (

            <Login
                submit={this.submit}
                processing={processing}
                formName={appConfig.formNames.login}
                fields={login}
                error={error} />

        );

    }
}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState) {
    return {
        processing: state.loading['LOGIN'],
        error: state.error['LOGIN']
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(LoginContainer);
