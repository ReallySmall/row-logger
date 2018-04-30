import * as React from 'react';
import * as classNames from 'classnames';
import { Line } from 'react-chartjs-2';
import { Interfaces } from './interfaces';

export class LineChart extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { data } = this.props;
        const options = {};

        return (

            <div>
                <Line data={data} options={options} />
            </div>

        );

    }
}
