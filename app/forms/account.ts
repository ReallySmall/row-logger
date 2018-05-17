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
<<<<<<< HEAD
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
    },
=======
>>>>>>> ab7fa1b615d1d925d2aae5cead6780c405a7790a
    rowerType: {
        name: 'rowerType',
        display: true,
        renderer: 'select',
        type: 'select',
        typeSpecific: {
            options: [
                {
                    value: 'waterRowerA1',
                    label: 'Water Rower A1'
                }
            ]
        },
        label: 'Rower type',
        value: '',
        placeholder: 'Select',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    }
};

export default account;