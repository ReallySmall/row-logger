import * as React from 'react';
import * as moment from 'moment';
import { NavLink } from 'react-router-dom';
import * as rowingHelpers from '../helpers/rowing';
import * as dateTimeHelpers from '../helpers/dateTime';
import { appConfig } from '../config';

export const totalsColumns: Array<Column> = [
    {
        columnId: 'distance',
        name: 'Total distance',
        width: '100%',
        sortable: false,
        sortDirection: null,
        renderer: (label: number) => {
            const formatted = rowingHelpers.metrestoKmString(label);
            return <span>{formatted}</span>;
        },
        renderTemplate: null
    },
    {
        columnId: 'time',
        name: 'Total time',
        width: '100%',
        sortable: false,
        sortDirection: null,
        renderer: (label: number) => {
            const formatted = dateTimeHelpers.millisToDuration(label);
            return <span>{formatted}</span>;
        },
        renderTemplate: null
    }
];

