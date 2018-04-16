import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

// a form control for various types of text input
export class TextAreaFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { disabled, id, label, input, type, typeSpecific, placeholder, required, meta } = this.props;
        const { touched, error } = meta;
        const { maxLength } = typeSpecific || 0;

        const textClass: string = classNames('form-control', 'form-row', 'form-textarea', { 'ValidationRequired': required });

        return (
            <div className={textClass}>
                <label htmlFor={id}>{label}</label>
                <textarea {...input} id={id} placeholder={placeholder} disabled={disabled} autoComplete="off" maxLength={maxLength} />
                {touched && error && <p className="plain validation-error-message">{error}</p>}
            </div>
        );

    }

}