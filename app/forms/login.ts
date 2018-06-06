const login: AppForm = {
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
    }
};

export default login;