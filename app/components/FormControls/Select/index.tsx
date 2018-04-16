import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

// a form control for various types of text input
export class SelectFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { disabled, id, label, input, type, typeSpecific, placeholder, required, meta } = this.props;
        const { options } = typeSpecific;
        const { touched, error } = meta;

        const defaultValue: string = placeholder || '';
        const selectClass: string = classNames('form-control', 'form-row', 'form-selectbox', { 'ValidationRequired': required });

        return (
            <div className={selectClass}>
                <label htmlFor={id}>{label}</label>
                <select
                    {...input}
                    id={id}
                    disabled={disabled}>
                    {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                    {options && options.length && options.map(function (option, index) {
                        return <option key={index} value={option.value}>{option.label}</option>;
                    })}
                </select>
                {touched && error && <p className="plain validation-error-message">{error}</p>}
            </div>
        );

    }

}