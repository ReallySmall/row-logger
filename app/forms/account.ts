const account: AppForm = {
    userName: {
        name: 'userName',
        display: true,
        renderer: 'text',
        type: 'text',
        typeSpecific: {},
        label: 'User name',
        value: '',
        placeholder: 'Your user name',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
    email: {
        name: 'email',
        display: true,
        renderer: 'text',
        type: 'text',
        typeSpecific: {},
        label: 'Email address',
        value: '',
        placeholder: 'Your email address',
        conditionalParent: undefined,
        required: true,
        validators: ['required', 'email']
    },
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

export default account;