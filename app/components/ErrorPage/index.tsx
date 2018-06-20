import * as React from 'react';
import { PageHeader, MainContentWrapper } from '../../components';
import { Interfaces } from './interfaces';

export class ErrorPage extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { title, description } = this.props;

        return (

            <div className="two-col-page wide submission-detail">
                <PageHeader title={title}></PageHeader>
                <MainContentWrapper sideBarContent={[]}>
                    {description}
                </MainContentWrapper>
            </div>

        );

    }

}
