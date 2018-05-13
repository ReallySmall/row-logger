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