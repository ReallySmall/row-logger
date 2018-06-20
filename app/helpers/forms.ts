import * as clone from 'clone';

export class AppFormHelper {

    constructor(appForm: AppForm) {
        this.form = clone(appForm);
    }

    form: AppForm = undefined;

    // return the form
    getForm(): AppForm {

        return this.form;

    }

    // redux-form passes in initial field values using an object where key is field's name
    // create that object to pass in from the field data
    getInitialFormValues(): AppFormValues {

        const form: AppForm = this.form;
        let initialValues: AppFormValues = {};

        Object.keys(form).map(function (field, index) {
            initialValues[form[field].name] = form[field].value;
        });

        return initialValues;

    }

    // set the value of a form field
    setFieldValue(field: string, value: any): void {

        this.form[field].value = value;

    }

}