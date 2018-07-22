import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { NavLink } from 'react-router-dom';
import { GridTableHeader, GridCheckBox, Pager } from '../../components';
import { RootState } from '../../reducers';
import { appConfig } from '../../config';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class GridBodyContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { columns, ids, items, showHeader, sortable } = this.props;

        const rowCount: number = ids ? ids.length : 0;
        const noDataMessage: string = 'No data to show';

        return (

            <div className="grid-body">
                <Table>
                    {showHeader &&
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => {

                                    const { columnId, name, sortDirection, width } = column;
                                    const columnIsSortable: boolean = sortable && column.sortable && ids.length ? true : false;

                                    return (
                                        <TableCell key={index}>{name}</TableCell>
                                    );

                                })}
                            </TableRow>
                        </TableHead>
                    }
                    <TableBody>
                        {rowCount > 0 && ids.map((id, index) => {

                            const row: any = items[id];

                            return (
                                <TableRow key={index}>
                                    {columns.map((column, index) => {

                                        const { columnId, width, renderTemplate, renderer } = column;
                                        const style = {
                                            width: width
                                        };

                                        let value: string = row[columnId]; // the contnet to display in the cell

                                        const cellContent: string = renderer // if the column has a rendering function
                                            ? renderer(value, id) // use it
                                            : value; // or just return the prebuilt label

                                        return (
                                            <TableCell key={index} style={style}>
                                                {cellContent}
                                            </TableCell>
                                        );

                                    })}
                                </TableRow>
                            );

                        })}
                        {!rowCount &&
                            <TableRow>
                                <TableCell>{noDataMessage}</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>

        );
    }
}

// React-Redux function which injects actions into this container as props
// function mapDispatchToProps(dispatch) {
//     return {
//         gridActions: bindActionCreators(GridActions as any, dispatch)
//     };
// }

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(null, null, utilsHelpers.mergePropsForConnect)(GridBodyContainer);