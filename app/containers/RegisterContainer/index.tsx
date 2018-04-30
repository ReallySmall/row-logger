import * as React from 'react';
import * as rolesConstants from '../../constants/roles';
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

    submit(){

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
                        {!processing && <FormContainer form="register" onSubmit={this.submit} fieldData={register} />}
                        {!processing && error && <p>{error}</p>}
                    </section>
                </MainContentWrapper>
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.sessions.processing,
        error: state.sessions.error
    };
}

// React-Redux function which injects actions into this container as props
// function mapDispatchToProps(dispatch) {
//     return {
//         sessionActions: bindActionCreators(sessionActions as any, dispatch)
//     };
// }

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, null, utilsHelpers.mergePropsForConnect)(RegisterContainer);