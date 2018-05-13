import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class ScrollWrapper extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { maxHeight, children } = this.props;

        const style: object = maxHeight ? {
            maxHeight: maxHeight
        } : null;

        return (

            <div style={style} className="scroll-wrapper">
                {children}
            </div>

        );
    }
}