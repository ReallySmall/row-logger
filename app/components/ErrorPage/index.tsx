import * as React from 'react';
import { PageHeader, MainContentWrapper, BackButton } from '../../components';
import { Interfaces } from './interfaces';

export class ErrorPage extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { title, description } = this.props;

        return (

            <div className="two-col-page wide submission-detail">
                <PageHeader pageTitle={title}></PageHeader>
                <MainContentWrapper
                    sideBarContent={
                        <div className="submission-detail__sidebar">
                            <BackButton path="/" label="Back" />
                        </div>
                    }>
                    {description}
                </MainContentWrapper>
            </div>

        );

    }

}
