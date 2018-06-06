const profile: AppForm = {
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
    }
};

export default profile;