import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridTableHeader, GridCheckBox } from '../../components';
import { RootState } from '../../reducers';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class GridHeaderContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    render() {

        const { items, ids, columns, processing } = this.props;
        const rows: Array<any> = ids;

        return (

            <div className="grid-header">
                {columns && <table>
                    <thead>
                        <tr>
                            {columns.map((column, index) => {

                                const { columnId, name, sortDirection, width } = column;
                                const sortable: boolean = !processing && column.sortable && rows.length ? true : false;

                                return (
                                    <GridTableHeader
                                        key={index}
                                        columnId={columnId}
                                        name={name}
                                        sortable={sortable}
                                        sortDirection={sortDirection}
                                        width={width} />
                                );

                            })}
                        </tr>
                    </thead>
                </table>}
            </div>

        );
    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState) {
    return {
        items: state.dashboard.items,
        ids: state.dashboard.ids,
        processing: state.dashboard.processing
    };
}

// React-Redux function which injects actions into this container as props
// function mapDispatchToProps(dispatch) {
//     return {
//         gridActions: bindActionCreators(gridActions as any, dispatch)
//     };
// }

export default connect(mapStateToProps, null, utilsHelpers.mergePropsForConnect)(GridHeaderContainer);