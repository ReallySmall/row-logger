import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import login from '../../forms/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { FormContainer } from '../../containers/FormContainer';
import { PageHeader, MainContentWrapper, Loading } from '../../components';
import { appConfig } from '../../config';
import { utilsHelpers, fetchHelpers } from '../../helpers';
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

            <div>
                <PageHeader title="Login"></PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Form</h2>
                        {processing && <Loading message="Logging in" />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <div className="card">
                                <FormContainer form="login" formWrapperClassNames="card-content" onSubmit={this.submit} fieldData={login} />
                            </div>
                        }
                    </section>
                </MainContentWrapper>
            </div>

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
        actions: bindActionCreators(AuthActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(LoginContainer);
