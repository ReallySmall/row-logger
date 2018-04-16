import * as React from 'react';
import * as GridActions from '../../actions/grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

        const { gridActions, columns, ids, items, showHeader, sortable } = this.props;

        const rowCount: number = ids ? ids.length : 0;
        const noDataMessage: string = 'Please submit a new query';

        return (

            <div className="grid-body">
                <table className="striped">
                    {showHeader &&
                        <thead>
                            <tr>
                                {columns.map((column, index) => {

                                    const { columnId, name, sortDirection, width } = column;
                                    const columnIsSortable: boolean = sortable && column.sortable && ids.length ? true : false;

                                    return (
                                        <GridTableHeader
                                            key={index}
                                            columnId={columnId}
                                            name={name}
                                            sortable={columnIsSortable}
                                            sortDirection={sortDirection}
                                            sortAction={gridActions.gridSortByColumn}
                                            width={width} />
                                    );

                                })}
                            </tr>
                        </thead>
                    }
                    <tbody>
                        {rowCount > 0 && ids.map((id, index) => {

                            const row: any = items[id];
                            const rowId: string = row[appConfig.data.keyField];

                            return (
                                <tr key={index}>
                                    {columns.map((column, index) => {

                                        const { columnId, width, renderTemplate, renderer } = column;
                                        const style = {
                                            width: width
                                        };

                                        let label: string = row[columnId]; // the contnet to display in the cell

                                        if (renderTemplate) { // if the column has a custom rendering template defined

                                            // render template is defined as a csv
                                            // trim the whitespace and convert to array of values
                                            const rowProps: Array<any> = renderTemplate.replace(/\s+/g, '').split(',');

                                            // if created array contains items
                                            if (rowProps.length > 0) {

                                                label = ''; // reset the label

                                                rowProps.map((rowProp) => { // then loop out the text content into the label
                                                    if (row[rowProp]) {
                                                        label += row[rowProp].toString() + ' ';
                                                    }
                                                });

                                            }

                                        }

                                        const cellContent: string = renderer // if the column has a rendering function
                                            ? renderer(label, row[appConfig.data.keyField]) // use it
                                            : label; // or just return the prebuilt label

                                        return (
                                            <td key={index} style={style}>
                                                <div className="cell-inner">
                                                    {cellContent}
                                                </div>
                                            </td>
                                        );

                                    })}
                                </tr>
                            );

                        })}
                        {!rowCount &&
                            <tr className="no-data">
                                <td>{noDataMessage}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        );
    }
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        gridActions: bindActionCreators(GridActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(null, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(GridBodyContainer);