import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class GridCheckBox extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.rowCheck = this.rowCheck.bind(this);
    }

    rowCheck(event) {

        const { selectAction, deselectAction, rowId } = this.props;

        if (event.target.checked) {
            selectAction(rowId);
        } else {
            deselectAction(rowId);
        }

    }

    render() {

        const { index, rowId, checked } = this.props;
        const inputId: string = rowId ? rowId + '_' + index : 'toggle-selection';

        return (

            <div className="checkbox">
                <input id={inputId} type="checkbox" checked={checked} className="react-grid-checkbox" onChange={this.rowCheck} />
                <label htmlFor={inputId}>
                    <span className="input-style-proxy icon icon-tick"></span>
                    <span className="visually-hidden">Toggle selection</span>
                </label>
            </div>

        );
    }
}
