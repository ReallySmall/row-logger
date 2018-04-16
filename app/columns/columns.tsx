import * as React from 'react';
import * as moment from 'moment';
import { NavLink } from 'react-router-dom';
import * as rowingHelpers from '../helpers/rowing';
import * as dateTimeHelpers from '../helpers/dateTime';
import { appConfig } from '../config';

export const columns: Array<Column> = [
    {
        columnId: 'createdAt',
        name: 'Date',
        width: '180px',
        sortable: true,
        sortDirection: null,
        renderer: (label: string) => {
            const formatted = moment(label).format(appConfig.dateFormats.dateTime);
            return <NavLink to="/sessions/url">{formatted}</NavLink>;
        },
        renderTemplate: null
    },
    {
        columnId: 'distance',
        name: 'Distance',
        width: '100%',
        sortable: true,
        sortDirection: null,
        renderer: (label: number) => {
            const formatted = rowingHelpers.metrestoKmString(label);
            return <span>{formatted}</span>;
        },
        renderTemplate: null
    },
    {
        columnId: 'time',
        name: 'Time',
        width: '100%',
        sortable: true,
        sortDirection: null,
        renderer: (label: number) => {
            const formatted = dateTimeHelpers.millisToDuration(label);
            return <span>{formatted}</span>;
        },
        renderTemplate: null
    }
];

