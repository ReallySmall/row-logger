import * as React from 'react';
import {Doughnut} from 'react-chartjs-2';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class DoughnutChart extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { data } = this.props;

        return (

            <Doughnut />

        );
    }
}
