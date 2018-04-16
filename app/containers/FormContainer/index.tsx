import * as React from 'react';
import { bindActionCreators } from 'redux';
import { formControls } from '../../components/FormControls';
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

        const { form, disabled, fieldData, handleSubmit, cancelSubmit, initialValues, currentValues, submitting, valid, formWrapperClassNames, formControlClassNames, dispatch } = this.props;
        let { changeAction, formSubmitType, formSubmitIcon, formSubmitLabel } = this.props;

        formSubmitType = formSubmitType || 'success'; // style of the submit button, or default to green if not passed in
        formSubmitIcon = formSubmitIcon || ''; // icon of the submit button, none if not passed in
        formSubmitLabel = formSubmitLabel || 'Submit'; // title of the submit button, or a default if not passed in

        return (
            <div className={formWrapperClassNames}>
                <Form onSubmit={handleSubmit} className="form form-horizontal">
                    <fieldset disabled={submitting}>
                        <legend className="visually-hidden">Form</legend>
                        <div>
                            {fieldData && Object.keys(fieldData).map((fieldDatum, index) => { // create a form control from each item of supplied field data

                                const { display, renderer, type, typeSpecific, label, placeholder, conditionalParent, options, required, validators } = fieldData[fieldDatum]; // get individual property vars to pass into renderer

                                const formControlRenderer: any = formControls[renderer]; // get the appropriate renderer for this form control type
                                const validationMethods: Array<any> = fieldValidationMethods(validators); // convert array list of validation types to array of validation methods
                                const conditionalRender: boolean = !conditionalParent ? true : this.shouldFieldConditionalRender(conditionalParent);

                                const otherFieldProps = { // set any other required properties to pass into the renderer - these are passed into Redux-form's Field 'props' prop
                                    id: form + '-' + index, // create unique id for each form element to tie to labels for accessibility
                                    disabled: disabled, // whether the control is currently disabled
                                    label: label, // the field's label
                                    placeholder: placeholder, // placeholder/ default value for selects
                                    required: required, // is the field required? (used to conditionally style the label)
                                    typeSpecific: typeSpecific, // properties specific to this form control type e.g. select options or datepicker date formatting
                                    changeAction: changeAction, // pass in a field change handler to use to hit store manually if required
                                };

                                return ( // render the form control for this field
                                    display && formControlRenderer && conditionalRender && // if field is set to display and has a renderer defined
                                        <div key={index} className={formControlClassNames}>
                                            <Field
                                                name={fieldDatum}
                                                type={type}
                                                props={otherFieldProps}
                                                component={formControlRenderer}
                                                validate={validationMethods} />
                                        </div> || null
                                );

                            })}
                            <div className={formControlClassNames}>
                                {cancelSubmit && <button onClick={cancelSubmit} disabled={disabled || submitting || !valid} className="button button-secondary">Cancel</button>}
                                <button type="submit" disabled={disabled || submitting || !valid} className="waves-effect waves-light btn">{formSubmitLabel}</button>
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