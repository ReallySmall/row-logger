import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class SideBar extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { sideBarContent } = this.props;

        return (

            <div className="side-bar">{sideBarContent}</div>

        );

    }

}
