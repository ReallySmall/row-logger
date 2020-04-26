import * as moment from 'moment';
import { appConfig } from '../config';

const sessionNote: AppForm = {
    Note: {
        name: 'Note',
        display: true,
        renderer: 'text',
        type: 'text',
        label: 'Note',
        value: '',
        conditionalParent: undefined,
        required: false,
        validators: []
    }
};

export default sessionNote;