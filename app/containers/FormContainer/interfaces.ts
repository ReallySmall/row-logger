export namespace Interfaces {

    export interface Props {
        form: string;
        fieldData: any;
        initialValues?: any;
        currentValues?: any;
        handleSubmit?: any;
        cancelSubmit?: any;
        submitting?: boolean;
        onSubmit: any;
        valid?: boolean;
        formWrapperClassNames?: string;
        formControlClassNames?: string;
        formSubmitLabel?: string;
        formSubmitType?: string;
        formSubmitIcon?: string;
        disabled?: boolean;
        changeAction?: Function;
        dispatch?: Function;
    }

    export interface State {
        /* empty */
    }

}