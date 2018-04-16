import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

// a form control for various types of text input
export class NumberFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { disabled, id, label, input, type, typeSpecific, placeholder, required, meta } = this.props;
        const { touched, error } = meta;
        const { min, max } = typeSpecific || 0;

        const textClass: string = classNames('form-control', 'form-row', 'form-textbox', { 'ValidationRequired': required });

        return (
            <div className={textClass}>
                <label htmlFor={id}>{label}</label>
                <input {...input} id={id} type={type} placeholder={placeholder} disabled={disabled} autoComplete="off" min={min} max={max} />
                {touched && error && <p className="plain validation-error-message">{error}</p>}
            </div>
        );

    }

}