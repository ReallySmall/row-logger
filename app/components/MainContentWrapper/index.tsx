import * as React from 'react';
import * as classNames from 'classnames';
import { SideBar } from '../../components';
import { Interfaces } from './interfaces';

export class MainContentWrapper extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { children, sideBarContent } = this.props;

        return (
            <div>
                <div className="grid-container main-container" id="content">
                    {sideBarContent && <SideBar sideBarContent={sideBarContent} />}
                    <div className="main-content full-width">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
