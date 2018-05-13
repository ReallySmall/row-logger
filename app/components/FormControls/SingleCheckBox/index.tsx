import * as React from 'react';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class SingleCheckBoxFormControl extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.onCheck = this.onCheck.bind(this);
    }

    // toggle the value of the input on check/ uncheck
    onCheck(event) {
        this.props.input.onChange(event.target.checked);
    }

    render() {

        const { disabled, id, label, input, type, placeholder, required, meta } = this.props;
        const { touched, error } = meta;

        const checkboxClass: string = classNames('input-style-proxy', 'icon', { 'icon-tick': input.checked });

        return (
            <div>
                <input id={id} checked={this.props.input.value} onChange={this.onCheck} className="single-checkbox" type={type} disabled={disabled} />
                <label htmlFor={id}><span className={checkboxClass}></span>{label}</label>
                {touched && error && <p className="plain validation-error-message">{error}</p>}
            </div>
        );

    }

}