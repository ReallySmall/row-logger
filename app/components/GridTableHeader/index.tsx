import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class GridTableHeader extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.sortByColumn = this.sortByColumn.bind(this);
    }

    sortByColumn(event) {

        const { sortAction, columnId, sortDirection } = this.props;

        sortAction(columnId, sortDirection);

    }

    render() {

        const { name, sortable, sortDirection, width } = this.props;

        const labelClasses: string = classNames({
            'icon': true,
            'icon-chevron-down': !sortDirection || sortDirection === 'desc',
            'icon-chevron-up': sortDirection && sortDirection === 'asc',
            'active': sortDirection,
            'disabled': !sortable
        });

        const label = sortable
            ? <button className={labelClasses} onClick={this.sortByColumn}>{name}</button>
            : <span className={labelClasses}>{name}</span>;

        const style = {
            width: width
        };

        return (

            <th style={style}>
                <div className="cell-inner">
                    {label}
                </div>
            </th>

        );

    }
}