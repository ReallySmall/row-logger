const updatePassword: AppForm = {
    password: {
        name: 'password',
        display: true,
        renderer: 'text',
        type: 'password',
        label: 'Current password',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    },
    newPassword: {
        name: 'newPassword',
        display: true,
        renderer: 'text',
        type: 'password',
        label: 'New password',
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
        label: 'Confirm new password',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    }
};

export default updatePassword;