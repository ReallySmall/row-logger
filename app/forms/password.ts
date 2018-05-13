const updatePassword: AppForm = {
    password: {
        name: 'password',
        display: true,
        renderer: 'text',
        type: 'password',
        typeSpecific: {},
        label: 'Password',
        value: '',
        placeholder: 'Your password',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
    confirmPassword: {
        name: 'confirmPassword',
        display: true,
        renderer: 'text',
        type: 'password',
        typeSpecific: {},
        label: 'Confirm password',
        value: '',
        placeholder: 'Your password',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    }
};

export default updatePassword;