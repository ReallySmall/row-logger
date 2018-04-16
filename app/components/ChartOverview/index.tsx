import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class ChartOverview extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { processing } = this.props;

        return (

            <div className="card-content">
                <p>Next target: River Aire (112 km)</p>
            </div>

        );

    }
}
