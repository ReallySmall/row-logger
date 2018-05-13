import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';
import { appConfig } from '../../config';

const Sticky = require('react-sticky-el'); // TODO this needs to be an ES6 import once a type file has been written

export class StickyWrapper extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { children, className } = this.props;

        return (

            <Sticky className={className}>{children}</Sticky>

        );

    }

}
