import * as React from 'react';
import { account, password } from '../../forms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormContainer } from '../../containers/FormContainer';
import { Loading, MainContentWrapper, PageHeader } from '../../components';
import { utilsHelpers, fetchHelpers } from '../../helpers';
import { RootState } from '../../reducers';
import { Interfaces } from './interfaces';

class AccountContainer extends React.Component<Interfaces.Props, Interfaces.State> {

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
                <PageHeader title="Account"></PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Form</h2>
                        {processing && <Loading message="processing" />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <div className="card">
                                <div className="card-content">
                                    <h3>Settings</h3>
                                    <FormContainer form="account" onSubmit={this.submit} fieldData={account} />
                                </div>
                                <div className="card-content">
                                    <h3>Update password</h3>
                                    <FormContainer form="updatePassword" onSubmit={this.submit} fieldData={password} />
                                </div>
                            </div>
                        }
                    </section>
                </MainContentWrapper>;
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        processing: state.loading['ACCOUNT'],
        error: fetchHelpers.getErrorMessageString(state.error['ACCOUNT'])
    };
}

// React-Redux function which injects actions into this container as props
// function mapDispatchToProps(dispatch) {
//     return {
//         sessionActions: bindActionCreators(sessionActions as any, dispatch)
//     };
// }

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, null, utilsHelpers.mergePropsForConnect)(AccountContainer);