import * as React from 'react';
import { profile, rowing, password } from '../../forms';
import * as accountActions from '../../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
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

    componentDidMount(){

        const { accountRequest } = this.props.accountActions;

        accountRequest();

    }

    submit(formValues: AppFormValues, action: any, formProps: any){

        const { accountUpdateRequest } = this.props.accountActions;

        accountUpdateRequest(formValues, formProps.form);

    }

    render() {

        const { processing, error, email, userName, rowerType, rowerDamping } = this.props;

        const initialProfileValues: any = {
            email: email,
            userName: userName
        };

        const initialRowerSettingsValues: any = {
            rowerType: rowerType,
            rowerDamping: rowerDamping
        };

        return (

            <div>
                <PageHeader title="Account settings"></PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Form</h2>
                        {processing && <Loading message="processing" />}
                        {!processing && error && <p>{error}</p>}
                        {!processing &&
                            <Card>
                                <h3>Profile</h3>
                                <FormContainer form="profile" onSubmit={this.submit} initialValues={initialProfileValues} fieldData={profile} />
                                <h3>Rower settings</h3>
                                <FormContainer form="rowerSettings" onSubmit={this.submit} initialValues={initialRowerSettingsValues} fieldData={rowing} />
                                <h3>Update password</h3>
                                <FormContainer form="updatePassword" onSubmit={this.submit} fieldData={password} />
                            </Card>
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
        processing: state.loading['ACCOUNT_DETAILS'] || state.loading['ACCOUNT_DETAILS_UPDATE'],
        error: fetchHelpers.getErrorMessageString(state.error['ACCOUNT_DETAILS']) || fetchHelpers.getErrorMessageString(state.error['ACCOUNT_DETAILS_UPDATE']),
        email: state.auth.email,
        userName: state.auth.userName,
        rowerType: state.auth.rowerType,
        rowerDamping: state.auth.rowerDamping
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(AccountContainer);