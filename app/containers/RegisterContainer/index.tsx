import * as React from 'react';
import * as AuthActions from '../../actions/auth';
import { register } from '../../forms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../../containers/FormContainer';
import { Loading, MainContentWrapper, PageHeader } from '../../components';
import { utilsHelpers } from '../../helpers';
import { RootState } from '../../reducers';
import { Interfaces } from './interfaces';

class RegisterContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.submit = this.submit.bind(this);
    }

    submit = (registerDetails: AppFormValues) => {

        const { registerRequest } = this.props.actions;

        registerRequest(registerDetails);

    }

    render() {

        const { processing, error } = this.props;

        return (

            <div>
                <PageHeader title="Register"></PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Form</h2>
                        {processing && <Loading message={processing} />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <div className="card">
                                <FormContainer form="register" formWrapperClassNames="card-content" onSubmit={this.submit} fieldData={register} />
                            </div>
                        }
                    </section>
                </MainContentWrapper>
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.loading['REGISTER'],
        error: state.error['REGISTER']
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(RegisterContainer);