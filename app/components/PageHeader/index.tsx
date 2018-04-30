import * as React from 'react';
import { Interfaces } from './interfaces';

export class PageHeader extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { title } = this.props;

        return (

            <div className="page-header">
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </div>

        );
    }
}
