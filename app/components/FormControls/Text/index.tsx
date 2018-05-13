import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

// a form control for various types of text input
export class TextFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { disabled, id, label, input, type, typeSpecific, placeholder, required, meta } = this.props;
        const { touched, error } = meta;
        const { maxLength } = typeSpecific || 0;

        const textClass: string = classNames({ 'required': required });

        return (
            <div className={textClass}>
                <label htmlFor={id}>{label}</label>
                <input {...input} id={id} type={type} placeholder={placeholder} disabled={disabled} autoComplete="off" maxLength={maxLength} />
                {touched && error && <p className="helper-text">{error}</p>}
            </div>
        );

    }

}