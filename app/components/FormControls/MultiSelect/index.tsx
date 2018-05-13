import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';
import { change } from 'redux-form';

const ReactCheckboxGroup = require('react-checkbox-group'); // TODO this needs to be an ES6 import once a type file has been written
const { Checkbox, CheckboxGroup } = ReactCheckboxGroup; // TODO this needs to be an ES6 import once a type file has been written

const onClickOutside = require('react-onclickoutside').default;

class MultiSelectFormControlBase extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleAllSelection = this.toggleAllSelection.bind(this);
        this.state = {
            active: false, // default to dropdown being hidden
            allCheckedVal: [] // the default for all items being checked
        };
    }

    componentDidMount() {

        const { options } = this.props.typeSpecific;
        const allCheckedVal = options.map(option => option.value); // create a stored val to use when all options need to be checked at once

        this.setState({
            allCheckedVal: allCheckedVal // add the all checked val to the state
        });

    }

    handleClickOutside() {

        this.setState({ active: false }); // close the dropdown if clicked outside of component

    }

    toggleDropDown(event) {

        this.setState({ active: !this.state.active });

    }

    toggleAllSelection(event) {

        event.preventDefault();

        const { allCheckedVal } = this.state;
        const { changeAction } = this.props; // the redux form action for manualy dispatching a field value change
        const { form } = this.props.meta; // the name of the form this field belongs to
        const { name, value } = this.props.input; // the name of this field
        const { options } = this.props.typeSpecific; // the name of this field

        const newValue: Array<any> = value.length === options.length && value.length > 0 ? [] : allCheckedVal; // are all options checked?

        changeAction(form, name, newValue); // dispatch the action to update this field's value to the redux form store

    }

    render() {

        const { active } = this.state;
        const { disabled, id, label, input, type, typeSpecific, required, meta } = this.props;
        const { name, value, onChange } = input;
        const { options, multiSelect } = typeSpecific;
        const { error, touched } = meta;

        const inputValue: Array<any> = value || [];
        const placeholderValue: string = input.value.length < options.length || input.value.length === 0 ? `${input.value.length} of ${options.length}` : 'All selected';
        const toggleButtonLabel: string = !value.length ? 'Select all' : 'Unselect all';

        const inputClass: string = classNames({ 'input-icon png-icon-menu': true });

        return (
            <div ref="component" className={classNames({ 'form-control form-row': true, 'ValidationRequired': required })}>
                <label htmlFor={id}>{label}</label>
                <div className={inputClass}>
                    <input
                        type="text"
                        id={id}
                        value={placeholderValue}
                        readOnly
                        disabled={disabled}
                        onFocus={this.toggleDropDown} />
                </div>
                {active &&
                    <div className="form-control form-choice-popup form-choice">
                        <button type="button" className="button button-secondary" onClick={this.toggleAllSelection}>{toggleButtonLabel}</button>
                        <div className="overflow-scroll">
                            <CheckboxGroup name="options" value={inputValue} onChange={onChange}>
                                {options && options.length && options.map(({ label, value }, index) => {
                                    return (
                                        <div key={index} className="checkbox">
                                            <Checkbox
                                                id={`${name}[${index}]`}
                                                value={value}
                                                onBlur={index === options.length - 1 ? this.toggleDropDown : null} />
                                            <label htmlFor={`${name}[${index}]`}>
                                                <span className="input-style-proxy icon icon-tick"></span>
                                                <span className="fc-title">{label}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </CheckboxGroup>
                        </div>
                    </div>
                }
                {error &&
                    <p className="plain validation-error-message">{error}</p>
                }
            </div>
        );

    }

}

// Export this component wrapped in the onClickOutside HOC
export const MultiSelectFormControl = onClickOutside(MultiSelectFormControlBase);