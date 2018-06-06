const rowerSettings: AppForm = {
    rowerType: {
        name: 'rowerType',
        display: true,
        renderer: 'select',
        type: 'select',
        options: [
            {
                value: 'waterRowerA1',
                label: 'Water Rower A1'
            }
        ],
        label: 'Rower type',
        value: '',
        conditionalParent: undefined,
        required: true,
        validators: ['required']
    }
};

export default rowerSettings;