import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import { register } from '../../forms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormContainer } from '../../containers/FormContainer';
import { Page, Column, Loading, MainContentWrapper, PageHeader } from '../../components';
import { utilsHelpers, fetchHelpers } from '../../helpers';
import { RootState } from '../../reducers';
import { Interfaces } from './interfaces';

class RegisterContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.submit = this.submit.bind(this);
    }

    submit = (registerDetails: AppFormValues) => {

        const { registerRequest } = this.props.authActions;

        registerRequest(registerDetails);

    }

    render() {

        const { processing, error } = this.props;

        return (

            <Page title="Account">
                <Column title="Register" width={6}>
                   <Paper>
                        {processing && <Loading message="Registering" />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <FormContainer form="register" onSubmit={this.submit} fieldData={register} />
                        }
                    </Paper>
                </Column>
            </Page>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.loading['REGISTER'],
        error: fetchHelpers.getErrorMessageString(state.error['REGISTER'])
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(RegisterContainer);