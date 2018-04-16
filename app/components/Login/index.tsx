import * as React from 'react';
import * as classNames from 'classnames';
import { FormContainer } from '../../containers/FormContainer';
import { PageHeader, MainContentWrapper, Loading } from '../../components';
import { Interfaces } from './interfaces';

export class Login extends React.Component<Interfaces.Props, Interfaces.State> {

    render() {

        const { formName, fields, submit, processing, error } = this.props;

        return (

            <div className="two-col-page narrow">
                <PageHeader pageTitle="Login">
                    {!processing && error && <p className="page-header-content warning">{error}</p>}
                </PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Form</h2>
                        {!processing && <FormContainer form={formName} onSubmit={submit} fieldData={fields} />}
                        {processing && <Loading message={processing} />}
                    </section>
                </MainContentWrapper>
            </div>

        );

    }
}
