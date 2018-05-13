import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class ToolBar extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { children, fullWidth } = this.props;

        const containerClass: string = fullWidth ? '' : 'grid-container';

        return (

            <div className="tool-bar">
                <div className={containerClass}>
                    <div className="tool-bar__content">
                    {children && children.length
                        ?   children.map((child, index) => {
                                return (
                                    <div key={index} className="tool-bar__item">{child}</div>
                                );
                            })
                        : <div className="tool-bar__item">{children}</div>
                        }
                    </div>
                </div>
            </div>

        );

    }

}
