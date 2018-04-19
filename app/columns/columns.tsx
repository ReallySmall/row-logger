import * as React from 'react';
import * as moment from 'moment';
import { NavLink } from 'react-router-dom';
import * as rowingHelpers from '../helpers/rowing';
import * as dateTimeHelpers from '../helpers/dateTime';
import { appConfig } from '../config';

export const columns: Array<Column> = [
    {
        columnId: 'date',
        name: 'Date',
        width: '180px',
        sortable: true,
        sortDirection: null,
        renderer: (value: string) => {
            console.log(value);
            const path: string = `/sessions/${dateTimeHelpers.timeStampToUrlPath(value)}`;
            const label: string = moment(value).format(appConfig.dateFormats.dateTime);
            return <NavLink to={path}>{label}</NavLink>;
        },
        renderTemplate: null
    },
    {
        columnId: 'distance',
        name: 'Distance',
        width: '100%',
        sortable: true,
        sortDirection: null,
        renderer: (value: number) => {
            const label: string = rowingHelpers.metrestoKmString(value);
            return <span>{label}</span>;
        },
        renderTemplate: null
    },
    {
        columnId: 'time',
        name: 'Time',
        width: '100%',
        sortable: true,
        sortDirection: null,
        renderer: (value: number) => {
            const label: string = dateTimeHelpers.millisToDuration(value);
            return <span>{label}</span>;
        },
        renderTemplate: null
    }
];

