import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import * as style from './style.css';
import { Interfaces } from './interfaces';

export class PageHeader extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { pageTitle, children } = this.props;

        return (
            <div className="page-header">
                <h1>{pageTitle}</h1>
                {children && <div className="page-header-sub-content">{children}</div>}
            </div>
        );
    }
}
