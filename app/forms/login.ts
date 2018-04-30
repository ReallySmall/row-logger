const login: AppForm = {
    email: {
        name: 'email',
        display: true,
        renderer: 'text',
        type: 'text',
        typeSpecific: {},
        label: 'User name',
        value: '',
        placeholder: 'Your email address',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
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
    }
};

export default login;