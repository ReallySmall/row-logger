const login: AppForm = {
    email: {
        name: 'email',
        display: true,
        renderer: 'text',
        type: 'text',
        typeSpecific: {},
<<<<<<< HEAD
        label: 'User name',
=======
        label: 'Email address',
>>>>>>> ab7fa1b615d1d925d2aae5cead6780c405a7790a
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