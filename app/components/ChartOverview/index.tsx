import * as React from 'react';
import * as classNames from 'classnames';
import { Doughnut } from 'react-chartjs-2';
import { Interfaces } from './interfaces';

export class ChartOverview extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { total, progress } = this.props;

        const data = {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data: [total - progress, progress],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        };

        const options = {
            legend: false
        };

        return (

            <div>
                <p>Next target: River Aire (112 km)</p>
                <Doughnut data={data} options={options} />
            </div>

        );

    }
}
