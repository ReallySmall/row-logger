import * as React from 'react';
import * as classNames from 'classnames';
import { Doughnut } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
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
                data: [progress, total - progress],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }]
        };

        const options = {
            legend: false
        };

        return (

            <div>
                <Typography gutterBottom noWrap>Next target: River Aire (112 km)</Typography>
                <Doughnut data={data} options={options} />
            </div>

        );

    }
}
