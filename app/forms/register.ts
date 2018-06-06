const login: AppForm = {
    userName: {
        name: 'userName',
        display: true,
        renderer: 'text',
        type: 'text',
        label: 'User name',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
    email: {
        name: 'email',
        display: true,
        renderer: 'text',
        type: 'text',
        label: 'Email address',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required', 'email']
    },
    password: {
        name: 'password',
        display: true,
        renderer: 'text',
        type: 'password',
        label: 'Password',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
    confirmPassword: {
        name: 'confirmPassword',
        display: true,
        renderer: 'text',
        type: 'password',
        label: 'Confirm password',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
};

export default login;