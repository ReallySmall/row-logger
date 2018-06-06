import * as React from 'react';
import * as classNames from 'classnames';
import * as dateTimeHelpers from '../../helpers/dateTime';
import * as rowingHelpers from '../../helpers/rowing';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total distance</TableCell>
                            <TableCell>Total time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{distance}</TableCell>
                            <TableCell>{time}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

        );

    }
}
