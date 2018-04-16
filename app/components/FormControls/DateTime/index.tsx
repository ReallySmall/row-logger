import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';
import { appConfig } from '../../../config';
import { Interfaces } from './interfaces';

const Datetime = require('react-datetime');

// a form control for various types of text input
export class DateTimeFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.state = {
            dateTimeConfig: {
                viewMode: 'days',
                dateFormat: appConfig.dateFormats.date || 'DD/MM/YYYY',
                timeFormat: appConfig.dateFormats.time || 'HH:mm'
            }
        };
    }

    render() {

        const { dateTimeConfig } = this.state;
        const { disabled, id, label, input, type, placeholder, required, meta } = this.props;
        const { touched, error } = meta;

        const inputProps = { // Datetime module is passed generic input props via this prop
            id: id,
            placeholder: placeholder,
            disabled: disabled,
            autoComplete: 'off'
        };

        const dateTimeClass: string = classNames('form-control', 'form-row', 'form-textbox', 'form-date-time', { 'ValidationRequired': required });
        const inputClass: string = '';

        return (
            <div className={dateTimeClass}>
                <label htmlFor={id}>{label}</label>
                <Datetime
                    {...input}
                    {...dateTimeConfig}
                    inputProps={inputProps}
                    className={inputClass} />
                {touched && error && <p className="plain validation-error-message">{error}</p>}
            </div>
        );

    }

}