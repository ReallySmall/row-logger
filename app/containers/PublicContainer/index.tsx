import * as React from 'react';
import * as sessionActions from '../../actions/sessions';
import * as authActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridBodyContainer } from '../../containers';
import { FormContainer } from '../..//containers/FormContainer';
import { Loading, Icon } from '../../components';
import { columns } from '../../columns/columns';
import { sessionFilters } from '../../forms';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Page, Column, Loading, ErrorPage, Icon, MainContentWrapper, PageHeader, LineChart, StyledPaper, ErrorModal } from '../../components';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class PublicContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {

        super(props, context);

        window.onSignIn = (googleUser){

          var profile = googleUser.getBasicProfile();

          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

          props.authActions.logInRequestComplete(profile.getName());

        }

    }

    render() {

        return (

            <article className="row">
                <StyledPaper>
                    <Typography>An IOT app for tracking indoor rowing using a Bluetooth Low Energy device and Google sheets.</Typography>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </StyledPaper> 
            </article>

        );

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions as any, dispatch),
        sessionActions: bindActionCreators(sessionActions as any, dispatch)
    };
}

export default connect(null, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(PublicContainer);