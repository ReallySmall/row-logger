import * as moment from 'moment';
import { appConfig } from '../config';

const sessionFilters: AppForm = {
    fromDate: {
        name: 'fromDate',
        display: true,
        renderer: 'text',
        type: 'date',
        label: 'From date',
        value: moment().startOf('day'),
        conditionalParent: undefined,
        required: true,
        validators: ['date', 'dateRange', 'required']
    },
    toDate: {
        name: 'toDate',
        display: true,
        renderer: 'text',
        type: 'date',
        label: 'To date',
        value: moment(),
        conditionalParent: undefined,
        required: true,
        validators: ['date', 'dateRange', 'required']
    }
};

export default sessionFilters;