import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class Icon extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { name, colour } = this.props;
        const style: Object = colour ? {
            fill: colour // refuse to spell mine wrong on purpose!
        } : null;

        return (

            <svg className="svg-icon" aria-hidden="true" style={style}>
                <use xlinkHref={'#' + name} />
            </svg>

        );
    }
}