import * as React from 'react';
import { bindActionCreators } from 'redux';
import { formControls } from '../../components/FormControls';
import MenuItem from 'material-ui/MenuItem';
import Button from '@material-ui/core/Button';
import { Form, Field, change } from 'redux-form';
import { fieldValidationMethods } from './validation/';
import { RootState } from '../../reducers';
import { Interfaces } from './interfaces';

const reactReduxModule = require('react-redux');
const reduxFormModule = require('redux-form');
const { connect } = reactReduxModule;
const { reduxForm } = reduxFormModule;

@connect(mapStateToProps, mapDispatchToProps) // connect to the application state through React-Redux
@reduxForm({  // connect to the Redux-Form application state
    touchOnChange: true
})
export class FormContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.shouldFieldConditionalRender = this.shouldFieldConditionalRender.bind(this);
    }

    componentDidUpdate() {

        const { form, fieldData, dispatch } = this.props;

        // after form updated, if any fields were conditionally hidden, empty their values
        Object.keys(fieldData).map((fieldDatum, index) => {

            const { conditionalParent } = fieldData[fieldDatum]; // get individual property vars to pass into renderer
            const conditionalRender: boolean = !conditionalParent ? true : this.shouldFieldConditionalRender(conditionalParent);

            if (!conditionalRender) {
                dispatch(change(form, fieldDatum, ''));
            }

        });

    }

    shouldFieldConditionalRender(requestedConditionalParentData: AppFormFieldConditionalParent): boolean {

        const { initialValues, currentValues } = this.props;

        // get the current form values or try falling back to initial values
        const formValues: AppFormValues = (currentValues && currentValues[requestedConditionalParentData.name] ? currentValues : undefined)
            || (initialValues && initialValues[requestedConditionalParentData.name] ? initialValues : undefined)
            || undefined;

        // if no values exist yet
        if (!formValues) {
            return false;
        }

        // get the conditional parent's value
        const fieldValue: string = formValues[requestedConditionalParentData.name];

        // if the value exists within the child's array of required values return true
        return requestedConditionalParentData.values.indexOf(fieldValue) > -1 ? true : false;

    }

    render() {

        const { form, disabled, fieldData, handleSubmit, cancelSubmit, initialValues, currentValues, submitting, valid, formWrapperClassNames, dispatch } = this.props;
        let { changeAction, formSubmitLabel } = this.props;

        formSubmitLabel = formSubmitLabel || 'Submit'; // title of the submit button, or a default if not passed in

        return (
            <div className={formWrapperClassNames}>
                <Form onSubmit={handleSubmit} className="form form-horizontal">
                    <fieldset disabled={submitting}>
                        <legend className="visually-hidden">Form</legend>
                        <div>
                            {fieldData && Object.keys(fieldData).map((fieldDatum, index) => { // create a form control from each item of supplied field data

                                const { display, renderer, type, options, label, conditionalParent, required, validators } = fieldData[fieldDatum]; // get individual property vars to pass into renderer

                                const formControlRenderer: any = formControls[renderer]; // get the appropriate renderer for this form control type
                                const validationMethods: Array<any> = fieldValidationMethods(validators); // convert array list of validation types to array of validation methods
                                const conditionalRender: boolean = !conditionalParent ? true : this.shouldFieldConditionalRender(conditionalParent);

                                return ( // render the form control for this field
                                    display && formControlRenderer && conditionalRender && // if field is set to display and has a renderer defined
                                        <div key={index}>
                                            <Field
                                                id={`${form}-${index}`}
                                                name={fieldDatum}
                                                type={type}
                                                component={formControlRenderer}
                                                required={required}
                                                validate={validationMethods}
                                                disabled={disabled}
                                                hintText={label}
                                                floatingLabelText={label}>
                                                    {type === 'select' && options.map((option, index) => <MenuItem key={index} value={option.value} primaryText={option.label}/>)}
                                            </Field>
                                        </div> || null
                                );

                            })}
                            <div className="form-submit-wrapper">
                                <Button type="submit" disabled={disabled || submitting || !valid} variant="raised" size="medium" color="primary">{formSubmitLabel}</Button>
                            </div>
                        </div>
                    </fieldset>
                </Form>
            </div>
        );

    }

}

// React-Redux function which injects application state into this container as props
// Get the current state of the form if any fields are conditional
// Don't by default as there's extra processing
function mapStateToProps(state: RootState, props) {
    return {
        currentValues: state.form && state.form[props.form] && state.form[props.form].values ? state.form[props.form].values : undefined
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        changeAction: bindActionCreators(change, dispatch)
    };
}