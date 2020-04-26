import * as React from 'react';
import * as errorActions from '../../actions/error';
import { profile, rowing, password } from '../../forms';
import * as accountActions from '../../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { FormContainer } from '../../containers/FormContainer';
import { Page, Column, Loading, MainContentWrapper, PageHeader, StyledPaper, ErrorModal } from '../../components';
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

            <Page title="Account">
                {error && <ErrorModal error={error} name="ACCOUNT_DETAILS" clearErrorAction={errorActions.clearError} />}
                <Column width={12}>
                    <Typography variant="display3" gutterBottom>Account</Typography>
                </Column>
                <Column title="Change settings" hideTitle={true} width={6}>
                    {processing && <Loading message="processing" />}
                    {!processing && error && <p>{error}</p>}
                    {!processing &&
                        <div>
                            <StyledPaper>
                                <Typography variant="title">User details</Typography>
                                <FormContainer form="profile" formSubmitLabel="Update" onSubmit={this.submit} initialValues={initialProfileValues} fieldData={profile} />
                            </StyledPaper>
                            <StyledPaper>
                                <Typography variant="title">Rower settings</Typography>
                                <FormContainer form="rowerSettings" formSubmitLabel="Update" onSubmit={this.submit} initialValues={initialRowerSettingsValues} fieldData={rowing} />
                            </StyledPaper>
                            <StyledPaper>
                                <Typography variant="title">Update password</Typography>
                                <FormContainer form="updatePassword" formSubmitLabel="Update" onSubmit={this.submit} fieldData={password} />
                            </StyledPaper>
                        </div>
                    }
                </Column>
            </Page>

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
        accountActions: bindActionCreators(accountActions as any, dispatch),
        errorActions: bindActionCreators(errorActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(AccountContainer);