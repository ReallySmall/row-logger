import * as React from 'react';
import * as authActions from '../../actions/auth';
import * as errorActions from '../../actions/error';
import login from '../../forms/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { FormContainer } from '../../containers/FormContainer';
import Paper from '@material-ui/core/Paper';
import { Page, Column, Loading, AlertDialog } from '../../components';
import { appConfig } from '../../config';
import { utilsHelpers, fetchHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class LoginContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.submit = this.submit.bind(this); // bind method
    }

    submit = (loginDetails: AppFormValues) => {

        const { logInRequest } = this.props.authActions;

        logInRequest(loginDetails);

    }

    render() {

        const { processing, error, errorActions } = this.props;

        return (

            <Page title="Account">
                <Column title="Login" width={6}>
                   <Paper>
                        {processing && <Loading message="Logging in" />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <FormContainer form="login" onSubmit={this.submit} fieldData={login} />
                        }
                    </Paper>
                </Column>
            </Page>

        );

    }
}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState) {
    return {
        processing: state.loading['LOGIN'],
        error: fetchHelpers.getErrorMessageString(state.error['LOGIN'])
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(LoginContainer);
