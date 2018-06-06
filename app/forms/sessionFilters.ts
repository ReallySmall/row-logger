import * as moment from 'moment';
import { appConfig } from '../config';

const sessionFilters: AppForm = {
    fromDate: {
        name: 'fromDate',
        display: true,
        renderer: 'dateTime',
        type: 'text',
        typeSpecific: {
            rangeFuture: 'toDate',
            rangePast: null
        },
        label: 'From date/time',
        value: moment().startOf('day'),
        conditionalParent: undefined,
        required: true,
        validators: ['date', 'dateRange', 'required']
    },
    toDate: {
        name: 'toDate',
        display: true,
        renderer: 'dateTime',
        type: 'text',
        typeSpecific: {
            rangeFuture: null,
            rangePast: 'fromDate'
        },
        label: 'To date/time',
        value: moment(),
        conditionalParent: undefined,
        required: true,
        validators: ['date', 'dateRange', 'required']
    }
};

export default sessionFilters;