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
                <div className="container">
                    {sideBarContent && <SideBar sideBarContent={sideBarContent} />}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
