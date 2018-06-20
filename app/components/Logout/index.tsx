import * as React from 'react';
import * as classNames from 'classnames';
import { PageHeader, MainContentWrapper, Loading } from '../../components';
import { Interfaces } from './interfaces';

export class Logout extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { processing } = this.props;

        return (

            <div className="two-col-page narrow">
                <PageHeader title="Log out" />
                <MainContentWrapper sideBarContent={[]}>
                    <section>
                        <h2 className="visually-hidden">Status</h2>
                        {processing && <Loading message="Logging out" />}
                    </section>
                </MainContentWrapper>
            </div>

        );

    }
}
