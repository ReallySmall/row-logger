import * as React from 'react';
import * as classNames from 'classnames';
import * as dateTimeHelpers from '../../helpers/dateTime';
import * as rowingHelpers from '../../helpers/rowing';
import { Interfaces } from './interfaces';

export class GridOverview extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { totals } = this.props;

        const distance: string = rowingHelpers.metrestoKmString(totals ? totals.metres : '');
        const time: string = dateTimeHelpers.millisToDuration(totals ? totals.time : '');

        return (

            <div className="card-content">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Total distance</th>
                            <th>Total time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{distance}</td>
                            <td>{time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );

    }
}
